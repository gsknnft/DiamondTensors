import { createPublicClient, http, createWalletClient, Client } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { Address} from 'viem';

export const privatekey: string = process.env.EVM_OPERATOR_PRIVATE_KEY!;

// Setup static clients
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.EVM_RPC_URL),
});

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(process.env.EVM_RPC_URL),
  account: privateKeyToAccount(process.env.EVM_OPERATOR_PRIVATE_KEY! as Address),
});

