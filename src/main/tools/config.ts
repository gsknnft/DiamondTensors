import * as dotenv from "dotenv";
dotenv.config();

export const cfg = {
  http: process.env.RPC_HTTP!,
  ws: process.env.RPC_WS!,
  chainId: Number(process.env.CHAIN_ID || 1),
  bait: process.env.BAIT_ADDRESS!,
  router: process.env.ROUTER!,
  fbRelay: process.env.FLASHBOTS_RELAY!,
  signerPk: process.env.SIGNER_PK!,
  searcherPk: process.env.SEARCHER_PK || process.env.SIGNER_PK!,
  tokenIn: process.env.TOKEN_IN!,
  tokenOut: process.env.TOKEN_OUT!,
  slippageBps: Number(process.env.SLIPPAGE_BPS || 80)
};
