import { getSupportedNetworks, getRpcUrl } from "./chains";
import * as services from "./extra-services";
import { type Address, type Hex, type Hash } from 'viem';
import { normalize } from 'viem/ens';
  // Write to contract
  import type {
  Abi,
  Account,
  Chain,
  SimulateContractParameters
} from "viem";

type MyContractParams = Parameters<
  ReturnType<typeof services.getPublicClient>['simulateContract']
>[0];

/**
 * Register all EVM-related tools with the MCP server
 * 
 * All tools that accept Ethereum addresses also support ENS names (e.g., 'vitalik.eth').
 * ENS names are automatically resolved to addresses using the Ethereum Name Service.
 * 
 * @param server The MCP server instance
 */
class Tools {
    static async getChainInfo({ network = "ethereum" }) {
      try {
        const chainId = await services.getChainId(network);
        const blockNumber = await services.getBlockNumber(network);
        const rpcUrl = getRpcUrl(network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              network,
              chainId,
              blockNumber: blockNumber.toString(),
              rpcUrl
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching chain info: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

  // ENS LOOKUP TOOL
  
  // Resolve ENS name to address
  static async resolveEns({ ensName, network = "ethereum" }: {ensName: string, network: string}) {
      try {
        // Validate that the input is an ENS name
        if (!ensName.includes('.')) {
          return {
            content: [{
              type: "text",
              text: `Error: Input "${ensName}" is not a valid ENS name. ENS names must contain a dot (e.g., 'name.eth').`
            }],
            isError: true
          };
        }
        
        // Normalize the ENS name
        const normalizedEns = normalize(ensName);
        
        // Resolve the ENS name to an address
        const address = await services.resolveAddress(ensName, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              ensName: ensName,
              normalizedName: normalizedEns,
              resolvedAddress: address,
              network
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error resolving ENS name: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

    static async get_supported_networks() {
      try {
        const networks = getSupportedNetworks();
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              supportedNetworks: networks
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching supported networks: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

  // BLOCK TOOLS
  
  // Get block by number
    static async get_block_by_number({ blockNumber, network = "ethereum" }: {blockNumber: number, network: string}) {
      try {
        const block = await services.getBlockByNumber(blockNumber, network);
        
        return {
          content: [{
            type: "text",
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching block ${blockNumber}: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  static async get_latest_block({ network = "ethereum" }) {
      try {
        const block = await services.getLatestBlock(network);
        
        return {
          content: [{
            type: "text",
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching latest block: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
    
    // BALANCE TOOLS
  
  // Get ETH balance
    static async get_balance({ address, network = "ethereum" }: {address: string | Address, network: string})  {
      try {
        const balance = await services.getETHBalance(address, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address,
              network,
              wei: balance.wei.toString(),
              ether: balance.ether
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching balance: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // Get ERC20 balance
    static async get_erc20_balance({ address, tokenAddress, network = "ethereum" }: {address: string | Address, tokenAddress: Address, network: string}) {
      try {
        const balance = await services.getERC20Balance(
          tokenAddress as Address,
          address as Address,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address,
              tokenAddress,
              network,
              balance: {
                raw: balance.raw.toString(),
                formatted: balance.formatted,
                decimals: balance.token.decimals
              }
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching ERC20 balance for ${address}: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

  // Get ERC20 token balance
    static async get_token_balance({ tokenAddress, ownerAddress, network = "ethereum" }: {tokenAddress: string | Address, ownerAddress: string | Address, network: string})  {
      try {
        const balance = await services.getERC20Balance(tokenAddress, ownerAddress, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              tokenAddress,
              owner: ownerAddress,
              network,
              raw: balance.raw.toString(),
              formatted: balance.formatted,
              symbol: balance.token.symbol,
              decimals: balance.token.decimals
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching token balance: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // TRANSACTION TOOLS

    static async get_transaction({ txHash, network = "ethereum" }: {txHash: string, network: string}) {
      try {
        const tx = await services.getTransaction(txHash as Hash, network);
        
        return {
          content: [{
            type: "text",
            text: services.helpers.formatJson(tx)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching transaction ${txHash}: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  


    static async get_transaction_receipt({ txHash, network = "ethereum" }: {txHash: string , network: string}) {
      try {
        const receipt = await services.getTransactionReceipt(txHash as Hash, network);
        
        return {
          content: [{
            type: "text",
            text: services.helpers.formatJson(receipt)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching transaction receipt ${txHash}: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  


    static async estimate_gas({ to, value, data, network = "ethereum" }: {to: string | Address, value: string, data: any, network: string}) {
      try {
        const params: any = { to: to as Address };
        
        if (value) {
          params.value = services.helpers.parseEther(value);
        }
        
        if (data) {
          params.data = data as `0x${string}`;
        }
        
        const gas = await services.estimateGas(params, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              network,
              estimatedGas: gas.toString()
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error estimating gas: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // TRANSFER TOOLS
  
  // Transfer ETH
    static async transfer_eth({ privateKey, to, amount, network = "ethereum" }: { privateKey: string, to: Address | string, amount: string, network: string } )  {
      try {
        const txHash = await services.transferETH(privateKey, to, amount, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash,
              to,
              amount,
              network
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error transferring ETH: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  
    static async transfer_erc20({ privateKey, tokenAddress, toAddress, amount, network = "ethereum" }: { privateKey: string, tokenAddress: string | Address, toAddress: string | Address, value: string, amount: string, network: string})  {
      try {
        // Get the formattedKey with 0x prefix
        const formattedKey = privateKey.startsWith('0x') 
          ? privateKey as `0x${string}` 
          : `0x${privateKey}` as `0x${string}`;
        
        const result = await services.transferERC20(
          tokenAddress as Address, 
          toAddress as Address, 
          amount,
          formattedKey,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash: result.txHash,
              network,
              tokenAddress,
              recipient: toAddress,
              amount: result.amount.formatted,
              symbol: result.token.symbol
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error transferring ERC20 tokens: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }


  // Approve ERC20 token spending
    static async approve_token_spending({ privateKey, tokenAddress, spenderAddress, amount, network = "ethereum" }: { privateKey: string, tokenAddress: string | Address, spenderAddress: string | Address, amount: string, network: string})  {
      try {
        // Get the formattedKey with 0x prefix
        const formattedKey = privateKey.startsWith('0x') 
          ? privateKey as `0x${string}` 
          : `0x${privateKey}` as `0x${string}`;
        
        const result = await services.approveERC20(
          tokenAddress as Address, 
          spenderAddress as Address, 
          amount,
          formattedKey,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash: result.txHash,
              network,
              tokenAddress,
              spender: spenderAddress,
              amount: result.amount.formatted,
              symbol: result.token.symbol
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error approving token spending: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // Transfer NFT (ERC721)
    static async transfer_nft({ privateKey, tokenAddress, tokenId, toAddress, network = "ethereum" }: { privateKey: string, tokenAddress: string | Address, tokenId: string | number | bigint, toAddress:  string | Address, network: string})  {
      try {
        // Get the formattedKey with 0x prefix
        const formattedKey = privateKey.startsWith('0x') 
          ? privateKey as `0x${string}` 
          : `0x${privateKey}` as `0x${string}`;
        
        const result = await services.transferERC721(
          tokenAddress as Address, 
          toAddress as Address, 
          BigInt(tokenId),
          formattedKey,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash: result.txHash,
              network,
              collection: tokenAddress,
              tokenId: result.tokenId,
              recipient: toAddress,
              name: result.token.name,
              symbol: result.token.symbol
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error transferring NFT: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

    static async transfer_erc1155({ privateKey, tokenAddress, tokenId, amount, toAddress, network = "ethereum" }: { privateKey: string, tokenAddress: string | Address, tokenId: string | number | bigint, amount: string, toAddress:  string | Address, network: string})  {
      try {
        // Get the formattedKey with 0x prefix
        const formattedKey = privateKey.startsWith('0x') 
          ? privateKey as `0x${string}` 
          : `0x${privateKey}` as `0x${string}`;
        
        const result = await services.transferERC1155(
          tokenAddress as Address, 
          toAddress as Address, 
          BigInt(tokenId),
          amount,
          formattedKey,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash: result.txHash,
              network,
              contract: tokenAddress,
              tokenId: result.tokenId,
              amount: result.amount,
              recipient: toAddress
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error transferring ERC1155 tokens: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

    static async transfer_token({ privateKey, tokenAddress, toAddress, amount, network = "ethereum" }: { privateKey: string, tokenAddress: string | Address, amount: string, toAddress:  string | Address, network: string})  {
      try {
        const result = await services.transferERC20(
          tokenAddress,
          toAddress,
          amount,
          privateKey,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              txHash: result.txHash,
              tokenAddress,
              toAddress,
              amount: result.amount.formatted,
              symbol: result.token.symbol,
              network
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error transferring tokens: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // CONTRACT TOOLS

    static async read_contract({ contractAddress, abi, functionName, args = [], network = "ethereum" }: { contractAddress: string, abi: Abi | any[], functionName: string , args: any[], network: string})  {
      try {
        // Parse ABI if it's a string
        const parsedAbi = typeof abi === 'string' ? JSON.parse(abi) : abi;
        
        const params = {
          address: contractAddress as Address,
          abi: parsedAbi,
          functionName,
          args,
          authorizationList: []
        };
        
        const result = await services.readContract(params, network);
        
        return {
          content: [{
            type: "text",
            text: services.helpers.formatJson(result)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error reading contract: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }



  static async write_contract({
    contractAddress,
    abi,
    functionName,
    args,
    privateKey,
    network = "ethereum"
  }: { contractAddress: string, abi: Abi | any[], functionName: string , args: any[], privateKey: string, network: string} )
  {
    try {
      // Parse ABI if it's a string
      const parsedAbi = typeof abi === "string" ? JSON.parse(abi) : abi;

      const contractParams: MyContractParams = {
        address: contractAddress as Address,
        abi: parsedAbi as Abi,
        functionName,
        args
      };

      const txHash = await services.writeContract(
        privateKey as Hex,
        contractParams,
        network
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                network,
                transactionHash: txHash,
                message: "Contract write transaction sent successfully"
              },
              null,
              2
            )
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error writing to contract: ${
              error instanceof Error ? error.message : String(error)
            }`
          }
        ],
        isError: true
      };
    }
  }

    static async is_contract({ address, network = "ethereum" }: { address: Address | string, network: string })  {
      try {
        const isContract = await services.isContract(address, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address,
              network,
              isContract,
              type: isContract ? "Contract" : "Externally Owned Account (EOA)"
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error checking if address is a contract: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

    static async get_token_info({ tokenAddress, network = "ethereum" }: { tokenAddress: Address | string, network: string })  {
      try {
        const tokenInfo = await services.getERC20TokenInfo(tokenAddress as Address, network);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address: tokenAddress,
              network,
              ...tokenInfo
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching token info: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }


  // Get ERC20 token balanc
    static async get_token_balance_erc20({ address, tokenAddress, network = "ethereum" }:{ address: Address | string, tokenAddress: Address | string, network: string })  {
      try {
        const balance = await services.getERC20Balance(
          tokenAddress as Address,
          address as Address,
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address,
              tokenAddress,
              network,
              balance: {
                raw: balance.raw.toString(),
                formatted: balance.formatted,
                decimals: balance.token.decimals
              }
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching ERC20 balance for ${address}: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

    static async get_nft_info({ tokenAddress, tokenId, network = "ethereum" }: { tokenAddress: Address | string, tokenId: string | number | bigint, network: string })  {
      try {
        const nftInfo = await services.getERC721TokenMetadata(
          tokenAddress as Address, 
          BigInt(tokenId), 
          network
        );
        
        // Check ownership separately
        let owner = null;
        try {
          // This may fail if tokenId doesn't exist
          owner = await services.getPublicClient(network).readContract({
            address: tokenAddress as Address,
            abi: [{ 
              inputs: [{ type: 'uint256' }], 
              name: 'ownerOf', 
              outputs: [{ type: 'address' }],
              stateMutability: 'view',
              type: 'function'
            }],
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
            authorizationList: []
          });
        } catch (e) {
          // Ownership info not available
        }
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId,
              network,
              ...nftInfo,
              owner: owner || 'Unknown'
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching NFT info: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  


    static async check_nft_ownership({ tokenAddress, tokenId, ownerAddress, network = "ethereum" }:{ tokenAddress: Address | string, tokenId: string | number | bigint, ownerAddress: Address | string,  network: string })  {
      try {
        const isOwner = await services.isNFTOwner(
          tokenAddress,
          ownerAddress,
          BigInt(tokenId),
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              tokenAddress,
              tokenId,
              ownerAddress,
              network,
              isOwner,
              result: isOwner ? "Address owns this NFT" : "Address does not own this NFT"
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error checking NFT ownership: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

    static async get_erc1155_token_uri({ tokenAddress, tokenId, network = "ethereum" }:{ tokenAddress: Address | string, tokenId: string | number | bigint, network: string })  {
      try {
        const uri = await services.getERC1155TokenURI(
          tokenAddress as Address, 
          BigInt(tokenId), 
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId,
              network,
              uri
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching ERC1155 token URI: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  

  // Add tool for getting ERC721 NFT balance
    static async get_nft_balance({ tokenAddress, ownerAddress, network = "ethereum" }: { tokenAddress: Address | string, ownerAddress: Address | string,  network: string })  {
      try {
        const balance = await services.getERC721Balance(
          tokenAddress as Address, 
          ownerAddress as Address, 
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              collection: tokenAddress,
              owner: ownerAddress,
              network,
              balance: balance.toString()
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching NFT balance: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  
  // Add tool for getting ERC1155 token balance
    static async get_erc1155_balance({ tokenAddress, tokenId, ownerAddress, network = "ethereum" }: { tokenAddress: Address | string, tokenId: string | number | bigint, ownerAddress: Address | string,  network: string })  {
      try {
        const balance = await services.getERC1155Balance(
          tokenAddress as Address, 
          ownerAddress as Address, 
          BigInt(tokenId),
          network
        );
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId,
              owner: ownerAddress,
              network,
              balance: balance.toString()
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching ERC1155 token balance: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }

  // WALLET TOOLS


    static async get_address_from_private_key({ privateKey }: {privateKey: string})  {
      try {
        // Ensure the private key has 0x prefix
        const formattedKey = privateKey.startsWith('0x') ? privateKey as Hex : `0x${privateKey}` as Hex;
        
        const address = services.getAddressFromPrivateKey(formattedKey);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              address,
              privateKey: "0x" + privateKey.replace(/^0x/, '')
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error deriving address from private key: ${error instanceof Error ? error.message : String(error)}`
          }],
          isError: true
        };
      }
    }
  }

  export {Tools};