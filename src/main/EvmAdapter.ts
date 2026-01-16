import { ChainAdapter, EvmSwapConfig } from '../../types/types';
import { Abi, Account, Address, Chain, Client, getContract, Hex } from 'viem';
import { getBalance } from 'viem/actions';
import { publicClient, walletClient } from './EvmClient';
import { performSwap, harvestProtocolFees, deployEVMContract, distributeRewardBatch } from './EvmUtils';

export interface EvmAdapter {
    conn(): Promise<Client>;
    auth(): Promise<Address>;
    getAccount(addr: string | Address): Promise<string>;
    getAccounts(addrs: (string | Address)[]): Promise<{
        index: number;
        address: string | Address;
    }[]>;
    getAccountBalance(addr: string | Address): Promise<bigint>;
    swap(config: EvmSwapConfig): Promise<void>;
    harvestFees(mint: string | Address, pool: string | Address, amount: bigint): Promise<void>;
    distributeRewards(inputMint: string | Address, total: bigint, amount: bigint): Promise<any>;
    deployEVM(params: {
        chain: Chain;
        account: Account;
        abi: any;
        bytecode: Hex;
        args: any[];
    }): Promise<Address>;
}
export const EvmAdapter: ChainAdapter = {
  async conn(): Promise<Client> {
    return publicClient as Client;
  },

  async auth(): Promise<Address> {
    return walletClient.account.address as Address;
  },

  async getAccount(addr: string | Address): Promise<string> {
    return addr as string;
  },

  async getAccounts(addrs: (string | Address)[]): Promise<{ index: number; address: string | Address }[]> {
    return addrs.map((addr: string | Address, index: number) => ({ index, address: addr }));
  },

  async getAccountBalance(addr: string | Address): Promise<bigint> {
    return await getBalance(publicClient as Client, { address: addr as Address });
  },

  async swap(config: EvmSwapConfig): Promise<void> {
    return await performSwap(walletClient as Client, config);
  },

  async harvestFees(mint: string | Address, pool: string | Address, amount: bigint): Promise<void> {
    return await harvestProtocolFees(walletClient as Client, { mint, pool, amount });
  },

  async distributeRewards(inputMint: string | Address, total: bigint, amount: bigint): Promise<any> {
    return await distributeRewardBatch(walletClient as Client, { inputMint, total, amount });
  },

  async deployEVM(params: { chain: Chain, account: Account, abi: any; bytecode: Hex; args: any[] }): Promise<Address> {
    const { abi, chain, account, bytecode, args } = params;
    const deployed = await deployEVMContract(walletClient as Client, { chain, account, abi, bytecode, args });
    return deployed as Address;
  },

  async deploySolanaToken(args: any, amount: bigint, { params }: { params: any }): Promise<any | Address> {
    // Not implemented for EVM, return null or throw error
    return null;
  },
};

// import { publicActions, walletActions, createPublicClient, createWalletClient } from 'viem';
// const config = { chain, transport, account };
// const publicClient = createPublicClient({ /* chain, transport */ });
// const walletClient = createWalletClient({ /* chain, transport, account */ });
export async function getContractInstance(address: Address, abi: Abi | any, client: Client = publicClient as Client) {
  return getContract({
    address,
    abi,
    client,
  });
}
//     conn: async () => walletClient,
//     auth: async () => walletClient.account,
//     swap: async ({ inputMint, outputMint, to, amount }) => {
//         // implement using walletClient and Uniswap/Curve/1inch/etc SDK
//     },
// };
