// // providers/evm-adapter/tools/token.ts
// import { Address, getContract } from 'viem';

// const erc20Minimal = [
//   { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
//   { type: 'function', name: 'symbol',   stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
// ] as const;

// export async function getTokenContext(
//   publicClient: any,
//   token: Address
// ): Promise<{ decimals: number; symbol: string }> {
//   const c = getContract({ address: token, abi: erc20Minimal, client: publicClient });
//   // many tokens are standard, but still guard with defaults
//   try {
//     const [dec, sym] = await Promise.all([c.read.decimals(), c.read.symbol()]);
//     return { decimals: Number(dec), symbol: sym };
//   } catch {
//     return { decimals: 18, symbol: 'TKN' };
//   }
// }
