import { Abi, Account, Chain, Client, Hex } from 'viem';
import { getBalance, deployContract } from 'viem/actions';
import { chainConfig } from 'viem/zksync';
import { walletClient } from './EvmClient';

export async function performSwap(client: Client, { inputMint, outputMint, to, amount }: SwapConfig) {
  const balance = await getBalance(client, {
    address: walletClient.account.address,
  });

  console.log(`Balance before swap: ${balance}`);
  // TODO: Add Uniswap/1inch SDK or MCP static-call
}

export async function harvestProtocolFees(client: Client, { mint, pool, amount }: { mint: string, pool: string, amount: bigint }) {
  console.log('Harvesting fees - implement me');
}

export async function deployEVMContract(client: Client, args: { chain: Chain, account: Account, abi: Abi | any; bytecode: Hex; args: any[] }) {
  const { abi, bytecode, chain, account, args: constructorArgs } = args;

  const deployedAddress = await deployContract(client, {
    abi,
    chain,
    bytecode,
    account,
    args: constructorArgs,
  });

  console.log(`Deployed ERC20 at ${deployedAddress}`);
  return deployedAddress;
}


export async function distributeRewardBatch(client: Client, { inputMint, total, amount }: { inputMint: string, total: bigint, amount: bigint }) {

  console.log('Distributing rewards - implement me');
}
