import { Address, getContract, zeroAddress } from 'viem';
import { quoteExactInputSingle } from './quote';
import { executeSwap } from './swap';
import { publicClient } from '../EvmClient';
import { getPublicClient, getWalletClient } from '../../core/extra-services';
import { getChain } from '../../core/chains';

export async function ensureAllowance({
  token, ownerPk, spender, want, network = 'ethereum'
}: {
  token: Address; ownerPk: `0x${string}`; spender: Address; want: bigint; network?: string;
}) {
  const chain = getChain(network)
  const pub = getPublicClient(network);
  const wal = getWalletClient(ownerPk, network);
  const erc20 = getContract({ address: token, abi: [
    { type:'function', name:'allowance', stateMutability:'view', inputs:[{type:'address'},{type:'address'}], outputs:[{type:'uint256'}]},
    { type:'function', name:'approve',   stateMutability:'nonpayable', inputs:[{type:'address'},{type:'uint256'}], outputs:[{type:'bool'}]},
  ] as const, client: { public: pub, wallet: wal }});
  const cur: bigint = await erc20.read.allowance([wal.account!.address, spender]);
  if (cur >= want) return;
  await erc20.write.approve([spender, want], { chain: chain, account: wal.account! });
}

const FEE = 3000; // pool fee (0.3%). probe others dynamically if needed.

function toUI(n: bigint, dec: number) { return Number(n) / 10 ** dec; }
function toRaw(n: number, dec: number) { return BigInt(Math.floor(n * 10 ** dec)); }

export async function runEvmSmartSwap({
  pk, tokenIn, tokenOut, amountInRaw, slippagePct, dryrun,
  recipient,
}: {
  pk: `0x${string}`;
  tokenIn: Address;
  tokenOut: Address;
  amountInRaw: bigint;       // in smallest units
  slippagePct: number;       // e.g. 0.5
  dryrun?: boolean;
  recipient: Address;
}) {
  const [decIn, decOut] = await Promise.all([buildTokenContext(tokenIn), buildTokenContext(tokenOut)]);

  // probe for spot:
  const probe = amountInRaw / 500n; // 0.2% probe just like you do
  const { amountOut: probeOut } = await quoteExactInputSingle({
    tokenIn, tokenOut, fee: FEE, amountIn: probe,
  });
  const spotRate = toUI(probeOut, decOut) / toUI(probe, decIn); // out per 1 in

  // initial bulk quote:
  const { amountOut } = await quoteExactInputSingle({ tokenIn, tokenOut, fee: FEE, amountIn: amountInRaw });
  const inUi = toUI(amountInRaw, decIn);
  const outUi = toUI(amountOut, decOut);
  const expectedOutUi = inUi * spotRate;
  const effPct = expectedOutUi > 0 ? (outUi / expectedOutUi) * 100 : 0;

  // threshold like your env:
  const MIN_ACCEPTABLE = parseFloat(process.env.MIN_ACCEPTABLE_PERCENT || '95'); // relative to spot, EVM-side
  if (effPct < MIN_ACCEPTABLE) {
    // fall back to chunking
    const [minChunk, maxChunk] = chunkBounds(decIn, 'balanced');
    const chunks = randomizedChunkSplit(amountInRaw, minChunk, maxChunk);
    let totIn = 0n, totOut = 0n;

    for (const c of chunks) {
      const { amountOut: qOut } = await quoteExactInputSingle({ tokenIn, tokenOut, fee: FEE, amountIn: c });
      const cUi = toUI(c, decIn);
      const qUi = toUI(qOut, decOut);
      const expUi = cUi * spotRate;
      const eff = expUi > 0 ? (qUi / expUi) * 100 : 0;

      const minOut = qOut - (qOut * BigInt(Math.floor(slippagePct * 100)) / 10000n); // bps
      if (!dryrun) {
        await ensureAllowance({ token: tokenIn, ownerPk: recipient, spender: '0x68b3...Fc45' as Address, want: c, pk });
        await swapExactInputSingle({
          pk, tokenIn, tokenOut, fee: FEE, recipient, amountIn: c, amountOutMin: minOut, deadline: BigInt(Math.floor(Date.now()/1000) + 900)
        });
      }

      totIn += c;
      totOut += qOut;
    }

    const totUiIn = toUI(totIn, decIn);
    const totUiOut = toUI(totOut, decOut);
    const pct = (totUiOut / (totUiIn * spotRate)) * 100;
    return { method: 'chunked', totalIn: totIn, totalOut: totOut, avgPercentReceived: pct };
  }

  // bulk path:
  const minOut = amountOut - (amountOut * BigInt(Math.floor(slippagePct * 100)) / 10000n);
  if (!dryrun) {
    await ensureAllowance({ token: tokenIn, ownerPk: recipient, spender: '0x68b3...Fc45' as Address, want: amountInRaw, pk });
    await swapExactInputSingle({
      pk, tokenIn, tokenOut, fee: FEE, recipient, amountIn: amountInRaw, amountOutMin: minOut, deadline: BigInt(Math.floor(Date.now()/1000) + 900)
    });
  }

  const pct = (outUi / expectedOutUi) * 100;
  return { method: 'auto', totalIn: amountInRaw, totalOut: amountOut, avgPercentReceived: pct };
}

// helpers (same spirit as your Solana code)
function unit(dec: number){ return 10n ** BigInt(dec); }
function chunkBounds(dec: number, profile: string){
  const one = unit(dec);
  const tbl: Record<string,[number,number]> = {
    micro:[0.01,0.03], tiny:[0.02,0.05], small:[0.03,0.08],
    conservative:[0.04,0.10], balanced:[0.05,0.15],
    aggressive:[0.15,0.50], max:[0.5,2.0], ultra:[2.0,5.0]
  };
  const [lo,hi] = tbl[profile] ?? tbl.balanced;
  return [BigInt(Math.floor(lo*Number(one))), BigInt(Math.floor(hi*Number(one)))] as const;
}
function randomizedChunkSplit(total: bigint, min: bigint, max: bigint){
  const out: bigint[] = [];
  let r = total;
  while (r > max){
    const n = BigInt(Math.floor(Math.random()*Number(max-min+1n))) + min;
    out.push(n); r -= n;
  }
  if (r > 0n) out.push(r);
  return out;
}
function buildTokenContext(tokenOut: string): any {
    throw new Error('Function not implemented.');
}

