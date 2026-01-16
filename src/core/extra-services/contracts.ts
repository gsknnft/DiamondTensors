import { 
  type Address, 
  type Hash, 
  type Hex,
  type ReadContractParameters,
  type GetLogsParameters,
  type Log
} from 'viem';
import { getPublicClient, getWalletClient } from './clients';
import { resolveAddress } from './ens';
type Net = string | number;

export async function readContract(params: ReadContractParameters, network = 'ethereum') {
  return getPublicClient(network).readContract(params);
}


export async function writeContract(
  privateKey: Hex,
  params: Parameters<ReturnType<typeof getPublicClient>['simulateContract']>[0],
  network = 'ethereum'
): Promise<Hash> {
  const publicClient = getPublicClient(network);
  const walletClient = getWalletClient(privateKey, network);

  // simulate → write
const { request } = await publicClient.simulateContract({
  ...(params as Parameters<typeof publicClient.simulateContract>[0]),
  account: walletClient.account!,
  chain: walletClient.chain,
});

  return walletClient.writeContract(request);
}

export async function getLogs(params: GetLogsParameters, network = 'ethereum'): Promise<Log[]> {
  return getPublicClient(network).getLogs(params);
}

/**
 * Check if an address is a contract
 * @param addressOrEns Address or ENS name to check
 * @param network Network name or chain ID
 * @returns True if the address is a contract, false if it's an EOA
 */
export async function isContract(addressOrEns: string, network = 'ethereum'): Promise<boolean> {
  // Resolve ENS name to address if needed
  const address = await resolveAddress(addressOrEns, network);
  
  const client = getPublicClient(network);
  const code = await client.getCode({ address });
  return code !== undefined && code !== '0x';
} 