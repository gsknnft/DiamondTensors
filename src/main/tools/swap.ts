import { ethers } from "ethers";
import { cfg } from "./config";
import { getContract, PublicClient, WalletClient, Address } from "viem";
import routerV2Abi from "./abi/uniswapV2Router.json";

export const v2Abi = [
  "function swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"
];
export const erc20 = [
  "function approve(address,uint) external returns (bool)",
  "function allowance(address,address) external view returns (uint256)"
];

export async function executeSwap(provider: ethers.Provider, signer: ethers.Wallet, amountIn: bigint, minOut: bigint, path: string[], to: string) {
  const router = new ethers.Contract(cfg.router, v2Abi, signer);
  const tokenIn = new ethers.Contract(path[0], erc20, signer);

  const allowance = (await tokenIn.allowance(await signer.getAddress(), cfg.router)).toBigInt();
  if (allowance < amountIn) {
    await (await tokenIn.approve(cfg.router, ethers.MaxUint256)).wait(1);
  }

    const swapFn = router.getFunction('swapExactTokensForTokens');
    await swapFn.staticCall(
      amountIn, minOut, path, to, Math.floor(Date.now()/1000)+600
    );
    const tx = await router.swapExactTokensForTokens(
      amountIn, minOut, path, to, Math.floor(Date.now()/1000)+600
    );
    await tx.wait(1);
}


export async function executeSwapV2({
  publicClient, walletClient, router, amountIn, amountOutMin, path, to
}: {
  publicClient: PublicClient;
  walletClient: WalletClient;
  router: Address;
  amountIn: bigint;
  amountOutMin: bigint;
  path: Address[];
  to: Address;
}) {
  const deadline = BigInt(Math.floor(Date.now()/1000) + 600);

  // simulate
  await publicClient.simulateContract({
    address: router,
    abi: routerV2Abi,
    functionName: 'swapExactTokensForTokens',
    args: [amountIn, amountOutMin, path, to, deadline],
    account: walletClient.account!,
  });

  // execute
  const routerC = getContract({
    address: router, abi: routerV2Abi,
    client: { public: publicClient, wallet: walletClient }
  });

  
  const hash = await routerC.write.swapExactTokensForTokens(
    [amountIn, amountOutMin, path, to, deadline],
    { account: walletClient.account! }
  );
  return publicClient.waitForTransactionReceipt({ hash });
}
