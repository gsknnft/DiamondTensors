'use client';

import { useEffect, useState } from 'react';
import { Abi, GetContractReturnType, PublicClient, WalletClient, getContract, createPublicClient, http, Address, Client } from 'viem';
import { usePublicClient } from 'wagmi';
import AFContract, { getAFContract } from '../externalContracts/AFContract';
import { mainnet } from 'viem/chains';


interface ContractInfo {
  address: Address,
  abi: Abi
}

export const getViemContract = async (contractInfo: ContractInfo, client?: Client) => {
  try {
    // Only create defaultPublicClient if no client is provided
    const effectiveClient = client || createPublicClient({
      batch: {
        multicall: true,
      },
      chain: mainnet,
      transport: http(), // Ensure this is the correct transport method for your use case
    });

    // Return the contract instance
    return getContract({
      address: contractInfo.address, // Ensure this address is correct
      abi: contractInfo.abi, // Ensure this ABI is correct
      client: effectiveClient,
    });
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error; // Optionally re-throw the error for further handling
  }
};



const useContract = ( walletClient?: WalletClient) => {
  //const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient() as PublicClient;
  // @ts-expect-error
  const [contract, setContract] = useState<GetContractReturnType<typeof AFContract.abi, PublicClient, typeof walletClient>>();

  // Function to connect to the contract
  const connectToContract = async () => {

    try {
      const connectedContract = await getAFContract(walletClient);
      // @ts-expect-error
      setContract(connectedContract);
    } catch (error) {
      console.error('Error connecting to the contract:', error);
    }
  };

  // Connect to the contract when the wallet client changes
  useEffect(() => {
    if (walletClient) {
      connectToContract();
    }
  }, [walletClient]);

  return contract;
};

export default useContract;