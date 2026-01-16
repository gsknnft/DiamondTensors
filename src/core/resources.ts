import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";
import { getSupportedNetworks, getRpcUrl } from "./chains";
import * as services from "./extra-services";
import type { Address, Hash } from "viem";
import { URL } from "url";
import { type Chain } from 'viem';


interface Params {
  address: Address | string,
  network: Chain | string,
  blockNumber: string | number,
  blockHash: number | string,
  tokenAddress: Address | string,
  tokenId: string | number,
  txHash: string
}

  interface Text {
    network: string,
    chainId: number,
    blockNumber: string,
    rpcUrl: string,
  }
interface Contents {
  contents: {
  uri: string,
  text: string | Text
  }[]  
}

interface ResourcesInt {
    chain_info_by_network(uri: URL, params: Params): Promise<Contents>;
    ethereum_chain_info(uri: URL): Promise<Contents>;
    evm_block_by_number(uri: URL, params: Params): Promise<Contents>;
    block_by_hash(uri: URL, params: Params): Promise<Contents>;
    default_latest_block(uri: URL): Promise<Contents>;
    getLatestBlock(uri: URL, params: Params): Promise<Contents>;
    evm_address_native_balance(uri: URL, params: Params): Promise<Contents>;
}

/**
 * EVM-related resources
 * @class  The Resources Class instance
 */
class Resources {
  // Get EVM info for a specific network
    static async chain_info_by_network(uri: URL, params: Params): Promise<Contents> {
      try {
        const network: string = typeof params.network == 'string' ? params.network : params.network.name;
        const chainId = await services.getChainId(network);
        const blockNumber = await services.getBlockNumber(network);
        const rpcUrl = getRpcUrl(network);
        
        return {
          ...new ResourceTemplate("evm://{network}/chain", { list: undefined }),
          contents: [{
            uri: uri.href,
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
          contents: [{
            uri: uri.href,
            text: `Error fetching chain info: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  


    static async ethereum_chain_info(uri: URL): Promise<Contents> {
      try {
        const network = "ethereum";
        const chainId = await services.getChainId(network);
        const blockNumber = await services.getBlockNumber(network);
        const rpcUrl = getRpcUrl(network);
        
        return {
          contents: [{
            uri: uri.href,
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
          contents: [{
            uri: uri.href,
            text: `Error fetching chain info: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Get block by number for a specific network
    static async evm_block_by_number(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const blockNumber = params.blockNumber as string;
        const block = await services.getBlockByNumber(parseInt(blockNumber), network);
        
        return {
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching block: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };


    static async block_by_hash(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const blockHash = params.blockHash as string;
        const block = await services.getBlockByHash(blockHash as Hash, network);
        
        return {
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching block with hash: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Get latest block for a specific network
    static async getLatestBlock(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const block = await services.getLatestBlock(network);
        
        return {
          ...new ResourceTemplate("evm://{network}/block/latest", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching latest block: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Default latest block (Ethereum mainnet)
    static async default_latest_block(uri: URL): Promise<Contents> {
      try {
        const network = "ethereum";
        const block = await services.getLatestBlock(network);
        
        return {
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(block)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching latest block: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };


    static async evm_address_native_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const address = params.address as string;
        const balance = await services.getETHBalance(address as Address, network);
        
        return {
          ... new ResourceTemplate("evm://{network}/address/{address}/balance", { list: undefined }),

          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              network,
              address,
              balance: {
                wei: balance.wei.toString(),
                ether: balance.ether
              }
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching ETH balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Default ETH balance (Ethereum mainnet)

    static async default_eth_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = "ethereum";
        const address = params.address as string;
        const balance = await services.getETHBalance(address as Address, network);
        
        return {
          ...new ResourceTemplate("evm://address/{address}/eth-balance", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              network,
              address,
              balance: {
                wei: balance.wei.toString(),
                ether: balance.ether
              }
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching ETH balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Get ERC20 balance for a specific network
    static async erc20_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const address = params.address as string;
        const tokenAddress = params.tokenAddress as string;
        
        const balance = await services.getERC20Balance(
          tokenAddress as Address,
          address as Address,
          network
        );
        
        return {
          ...new ResourceTemplate("evm://{network}/address/{address}/token/{tokenAddress}/balance", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              network,
              address,
              tokenAddress,
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
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC20 balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Default ERC20 balance (Ethereum mainnet)
    static async default_erc20_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = "ethereum";
        const address = params.address as string;
        const tokenAddress = params.tokenAddress as string;
        
        const balance = await services.getERC20Balance(
          tokenAddress as Address,
          address as Address,
          network
        );
        
        return {
          ...new ResourceTemplate("evm://address/{address}/token/{tokenAddress}/balance", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              network,
              address,
              tokenAddress,
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
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC20 balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Get transaction by hash for a specific network
    static async evm_transaction_details(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const txHash = params.txHash as string;
        const tx = await services.getTransaction(txHash as Hash, network);
        
        return {
          ...new ResourceTemplate("evm://{network}/tx/{txHash}", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(tx)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching transaction: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Default transaction by hash (Ethereum mainnet)
    static async default_transaction_by_hash(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = "ethereum";
        const txHash = params.txHash as string;
        const tx = await services.getTransaction(txHash as Hash, network);
        
        return {
          ...new ResourceTemplate("evm://tx/{txHash}", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: services.helpers.formatJson(tx)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching transaction: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Get supported networks
    static async supported_networks(uri: URL) {
      try {
        const networks = getSupportedNetworks();
        
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              supportedNetworks: networks
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching supported networks: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Add ERC20 token info resource
    static async erc20_token_details(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        
        const tokenInfo = await services.getERC20TokenInfo(tokenAddress, network);
        
        return {
          ...new ResourceTemplate("evm://{network}/token/{tokenAddress}", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              address: tokenAddress,
              network,
              ...tokenInfo
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC20 token info: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Add ERC20 token balance resource
    static async erc20_token_address_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        const address = params.address as Address;
        
        const balance = await services.getERC20Balance(tokenAddress, address, network);
        
        return {
          ...new ResourceTemplate("evm://{network}/token/{tokenAddress}/balanceOf/{address}", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              tokenAddress,
              owner: address,
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
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC20 token balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Add NFT (ERC721) token info resource
    static async erc721_nft_token_details(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        const tokenId = BigInt(params.tokenId as string);
        
        const nftInfo = await services.getERC721TokenMetadata(tokenAddress, tokenId, network);
        
        // Get owner separately
        let owner = "Unknown";
        try {
          const isOwner = await services.isNFTOwner(tokenAddress, params.address as Address, tokenId, network);
          if (isOwner) {
            owner = params.address as string;
          }
        } catch (e) {
          // Owner info not available
        }
        
        return {
          ...new ResourceTemplate("evm://{network}/nft/{tokenAddress}/{tokenId}", { list: undefined }),

          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId: tokenId.toString(),
              network,
              ...nftInfo,
              owner
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching NFT info: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Add NFT ownership check resource
    static async erc721_nft_ownership_check(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        const tokenId = BigInt(params.tokenId as string);
        const address = params.address as Address;
        
        const isOwner = await services.isNFTOwner(tokenAddress, address, tokenId, network);
        
        return {
          ...new ResourceTemplate("evm://{network}/nft/{tokenAddress}/{tokenId}/isOwnedBy/{address}", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId: tokenId.toString(),
              owner: address,
              network,
              isOwner
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error checking NFT ownership: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };

  // Add ERC1155 token URI resource

    static async erc1155_token_metadata_uri(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        const tokenId = BigInt(params.tokenId as string);
        
        const tokenURI = await services.getERC1155TokenURI(tokenAddress, tokenId, network);
        
        return {
          ...new ResourceTemplate("evm://{network}/erc1155/{tokenAddress}/{tokenId}/uri", { list: undefined }),
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId: tokenId.toString(),
              network,
              uri: tokenURI
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC1155 token URI: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    };


    static async erc1155_token_address_balance(uri: URL, params: Params): Promise<Contents> {
      try {
        const network = params.network as string;
        const tokenAddress = params.tokenAddress as Address;
        const tokenId = BigInt(params.tokenId as string);
        const address = params.address as Address;
        
        const balance = await services.getERC1155Balance(tokenAddress, address, tokenId, network);
        
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              contract: tokenAddress,
              tokenId: tokenId.toString(),
              owner: address,
              network,
              balance: balance.toString()
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: `Error fetching ERC1155 token balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  }

  export {Resources};