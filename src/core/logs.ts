import { decodeEventLog, type AbiEvent, type Address, type Log } from 'viem';

export function filterLogsByAddress<T extends Log>(logs: T[], address: Address) {
  return logs.filter(l => l.address.toLowerCase() === address.toLowerCase());
}

export function tryDecode<T>(abi: readonly AbiEvent[], log: Log) {
  try {
    return decodeEventLog({ abi, data: log.data, topics: log.topics });
  } catch { return null; }
}
