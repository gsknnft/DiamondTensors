import { JsonRpcProvider, Wallet } from "ethers";
import { FlashbotsBundleProvider, FlashbotsBundleRawTransaction } from "@flashbots/ethers-provider-bundle";
import { cfg } from "./config";



export async function prepTx(txs: FlashbotsBundleRawTransaction[]) {
    let txss: string[] = [];
    for (const tx of txs) {
        txss.push(tx.signedTransaction)
    }
    return txss;
}

 
export async function submitBundle(provider: JsonRpcProvider, txs: FlashbotsBundleRawTransaction[], signer: Wallet) {
  const fb = await FlashbotsBundleProvider.create(provider, signer, cfg.fbRelay || "https://relay.flashbots.net");
  const txs_ = await prepTx(txs)
  const block = await provider.getBlockNumber();
  const res = await fb.sendRawBundle(txs_, block + 1);
  return res;
}
