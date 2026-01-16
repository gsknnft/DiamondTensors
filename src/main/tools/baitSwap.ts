import { ethers } from "ethers";
import { cfg } from "./config";

const baitAbi = [
  "function baitOrSwap(address,address,uint256,uint256,uint256,bool,uint8,bytes32) external"
];

export async function sendBaitTx(provider: ethers.Provider, signer: ethers.Wallet, {
  tokenIn, tokenOut, amountIn, minOut, forceRevert = true, timeParity = 0
}: {
  tokenIn: string; tokenOut: string; amountIn: bigint; minOut: bigint; forceRevert?: boolean; timeParity?: 0|1|2;
}) {
  const bait = new ethers.Contract(cfg.bait, baitAbi, signer);
  const salt = ethers.keccak256(ethers.randomBytes(32));
  const deadline = Math.floor(Date.now()/1000) + 600;

  // approve bait to pull tokens (so copy-bots think it’s legit)
  const erc20 = new ethers.Contract(tokenIn, ["function approve(address,uint256) external returns (bool)"], signer);
  await (await erc20.approve(cfg.bait, amountIn.toString())).wait(1);

  const tx = await bait.baitOrSwap(tokenIn, tokenOut, amountIn.toString(), minOut.toString(), deadline, forceRevert, timeParity, salt, {
    gasLimit: 350_000
  });
  return tx.hash;
}
