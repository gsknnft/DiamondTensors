import { ethers } from "ethers";
import { cfg } from "./config";
import { getWebSocketRpcClient } from "viem/utils";

export function watchMempool(onSuspicious: (tx: ethers.TransactionRequest, from: string) => void) {
  const wss = getWebSocketRpcClient(process.env.RPC_WEBSOCKET_ENDPOINT)
  const ws = new ethers.WebSocketProvider(cfg.ws, cfg.chainId);
  ws.on("pending", async (hash: string) => {
    try {
      const tx = await ws.getTransaction(hash);
      if (!tx || !tx.to) return;

      // Cheap heuristics: tx to router or to your bait contract that touches tokenIn
      const isRouter = tx.to.toLowerCase() === cfg.router.toLowerCase();
      const isBait   = tx.to.toLowerCase() === cfg.bait.toLowerCase();
      if (!isRouter && !isBait) return;

      // Optional: inspect input selector/signature, decode path from calldata via ABI if needed
      onSuspicious(tx as any, tx.from!);
    } catch {}
  });
  return ws;
}
