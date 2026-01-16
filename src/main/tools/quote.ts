import { Address, getContract } from 'viem';
import { publicClient } from '../EvmClient';
import { ethers } from 'ethers';
import { cfg } from './config';
import { v2Abi } from './swap';

export const QUOTER_V2 = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e' as Address;

// Full JSON ABI fragment, not human-readable string
const QuoterV2Abi = [{
  "type": "function",
  "name": "quoteExactInputSingle",
  "stateMutability": "view",
  "inputs": [{
    "name": "params",
    "type": "tuple",
    "components": [
      { "name": "tokenIn", "type": "address" },
      { "name": "tokenOut","type": "address" },
      { "name": "fee",     "type": "uint24"  },
      { "name": "recipient","type": "address" },
      { "name": "amountIn","type": "uint256" },
      { "name": "sqrtPriceLimitX96","type":"uint160" }
    ]
  }],
  "outputs": [
    { "name":"amountOut","type":"uint256" },
    { "name":"sqrtPriceX96After","type":"uint160" },
    { "name":"initializedTicksCrossed","type":"uint32" },
    { "name":"gasEstimate","type":"uint256" }
  ]
}] as const;



export async function getAmountsOutCall(provider: ethers.Provider, amountIn: bigint, path: string[]) {

  const router = new ethers.Contract(cfg.router, v2Abi, provider);

  const amounts: ethers.BigNumberish[] = await router.getAmountsOut(amountIn.toString(), path);

  return amounts.map(a => a);

}

// Strongly-typed wrapper
export async function quoteExactInputSingle({
  tokenIn, tokenOut, fee, amountIn,
}: {
  tokenIn: Address; tokenOut: Address; fee: number; amountIn: bigint;
}) {
  const quoter = getContract({
    address: QUOTER_V2,
    abi: QuoterV2Abi,
    client: publicClient,
  });

  const [amountOut] = await quoter.read.quoteExactInputSingle([{
    tokenIn,
    tokenOut,
    fee,
    recipient: '0x0000000000000000000000000000000000000000',
    amountIn,
    sqrtPriceLimitX96: 0n,
  }]);

  return { amountOut };
}
