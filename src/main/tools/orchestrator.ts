import { ethers } from "ethers";
import { cfg } from "./config";
import { randomizedChunkSplit } from "./chunker";
import { getAmountsOutCall } from "./quote";
import { sendBaitTx } from "./baitSwap";
import { watchMempool } from "./mempoolListener";

async function main() {
  const provider = new ethers.JsonRpcProvider(cfg.http, cfg.chainId);
  const signer = new ethers.Wallet(cfg.signerPk, provider);

  // 1) pre-compute spot via getAmountsOut
  const [spotIn, spotOut] = [
    10n ** 18n / 1000n, // 0.001 tokenIn example (adjust decimals)
    0n
  ];
  const spot = await getAmountsOutCall(provider, spotIn, [cfg.tokenIn, cfg.tokenOut]);

  // 2) chunk plan (port from Solana)
  const total = 10n ** 18n;           // 1 tokenIn example
  const chunks = randomizedChunkSplit(total, 10n**15n, 3n*10n**16n);

  // 3) mempool listener (for copy/sandwich)
  const ws = watchMempool((tx, from) => {
    console.log("👀 mempool hit:", from, tx.to);
    // optional: match token pair in calldata, then trigger counter‑snipe with Flashbots
  });

  // 4) Send a small bait
  const baitHash = await sendBaitTx(provider, signer, {
    tokenIn: cfg.tokenIn,
    tokenOut: cfg.tokenOut,
    amountIn: chunks[0],
    minOut: (BigInt(spot[1]) * 98n) / 100n,   // 2% slippage guard for the “real” path (even though we revert)
    forceRevert: true,                // pure signal
    timeParity: 1                     // odds-only; half will revert even if forceRevert=false
  });
  console.log("🪤 bait tx:", baitHash);

  // 5) (optional) after detection, place real swaps or Flashbots bundles…

  // Keep process alive to watch mempool
  process.on("SIGINT", () => { ws.destroy(); process.exit(0); });
}
main().catch(console.error);
