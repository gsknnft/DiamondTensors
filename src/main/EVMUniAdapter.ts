// // evm-uni-adapter.ts
// import { Address, Account, PublicClient, WalletClient } from 'viem';
// import { getDeployment } from '../core/registry';
// import { getQuote } from '../core/quote';
// import { executeSwap } from '../core/exec';
// import { ensureSpendAuth } from '../core/allowance';

// export type EvmAdapterDeps = {
//   publicClient: PublicClient;
//   walletClient: WalletClient;
//   chainId: number;
// };

// export class EvmUniAdapter {
//   kind = 'evm' as const;
//   constructor(private deps: EvmAdapterDeps) {}

//   async quote(input: {
//     tokenIn: Address; tokenOut: Address; amountIn: bigint; fee?: number;
//   }) {
//     const { publicClient, chainId } = this.deps;
//     const q = await getQuote({
//       publicClient, chainId,
//       tokenIn: input.tokenIn, tokenOut: input.tokenOut,
//       amountIn: input.amountIn, fee: input.fee ?? 3000,
//     });
//     return { in: input.amountIn, out: q.amountOut, route: null };
//   }

//   async executeSwap(input: {
//     tokenIn: Address; tokenOut: Address; amountIn: bigint; minOut: bigint; to: Address; fee?: number;
//   }) {
//     const { publicClient, walletClient, chainId } = this.deps;
//     const { universalRouter, routerV3, routerV2 } = getDeployment(chainId);
//     const spender = (universalRouter || routerV3 || routerV2)!;

//     await ensureSpendAuth({
//       publicClient, walletClient, chainId,
//       token: input.tokenIn, owner: walletClient.account!.address,
//       spender, want: input.amountIn,
//     });

//     const receipt = await executeSwap({
//       publicClient, walletClient, chainId,
//       tokenIn: input.tokenIn, tokenOut: input.tokenOut,
//       amountIn: input.amountIn, minOut: input.minOut,
//       recipient: input.to, fee: input.fee ?? 3000,
//     });

//     return {
//       txHash: receipt.transactionHash,
//       blockNumber: receipt.blockNumber,
//       gasUsed: receipt.gasUsed,
//       outputAmount: input.minOut, // refine by decoding logs if you want exact
//       timestamp: Date.now(),
//     };
//   }
// }
