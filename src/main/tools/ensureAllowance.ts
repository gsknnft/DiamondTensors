// // providers/evm-adapter/tools/ensureAllowance.ts
// import { Address, getContract } from 'viem';
// import { getPublicClient, getWalletClient } from '../../core/extra-services';
// import { getChain } from '../../core/chains';

// const erc20 = [
//   { type:'function', name:'allowance', stateMutability:'view', inputs:[{type:'address'},{type:'address'}], outputs:[{type:'uint256'}] },
//   { type:'function', name:'approve',   stateMutability:'nonpayable', inputs:[{type:'address'},{type:'uint256'}], outputs:[{type:'bool'}] },
// ] as const;

// export async function ensureAllowance({
//   token, ownerPk, spender, want, network = 'ethereum'
// }: {
//   token: Address; ownerPk: `0x${string}`; spender: Address; want: bigint; network?: string;
// }) {
//   const chain = getChain(network);
//   const pub = getPublicClient(network);
//   const wal = getWalletClient(ownerPk, network);

//   const erc20C = getContract({
//     address: token, abi: erc20,
//     client: { public: pub, wallet: wal }
//   });

//   const cur: bigint = await erc20C.read.allowance([wal.account!.address, spender]);
//   if (cur >= want) return;

//   await erc20C.write.approve([spender, want], { chain, account: wal.account! });
// }
