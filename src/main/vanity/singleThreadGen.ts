import { randomBytes } from 'crypto';
import { Address, privateKeyToAccount } from 'viem/accounts';
 
interface AddressOutput {
  address: Address, privateKey: string, attempts: number
}

export async function generateVanitySync({ prefix = '', suffix = '' }: { prefix?: string; suffix?: string }): Promise<AddressOutput> {
  const lowerPrefix = prefix.toLowerCase();
  const lowerSuffix = suffix.toLowerCase();
  let attempts = 0;

  while (true) {
    attempts++;
    const privKey = `0x${randomBytes(32).toString('hex')}` as Address;
    const { address } = privateKeyToAccount(privKey);

    if (
      (lowerPrefix && !address.slice(2).toLowerCase().startsWith(lowerPrefix)) ||
      (lowerSuffix && !address.slice(2).toLowerCase().endsWith(lowerSuffix))
    ) {
      continue;
    }

    return { address, privateKey: privKey, attempts };
  }
}


/* 
import { parentPort, workerData } from 'worker_threads';
import { generateVanitySync } from './vanityCore';

const result = generateVanitySync(workerData);
parentPort?.postMessage(result);
*/