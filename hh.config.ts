/* 

// hardhat.config.ts
import * as dotenv from "dotenv";
dotenv.config();

import type { HardhatEthersHelpers } from "@nomicfoundation/hardhat-ethers/types";
import type { ethers } from "ethers";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";        // includes hardhat-ethers, chai-matchers, verify
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-contract-sizer";
import "hardhat-spdx-license-identifier";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "hardhat-watcher";
// import "hardhat-diamond"; // uncomment if you actually use it

import { task } from "hardhat/config";
import { internalTask } from "hardhat/config";
import { Signer, ethers } from "ethers";
import { TASK_COMPILE_SOLIDITY_GET_COMPILER_INPUT } from "hardhat/builtin-tasks/task-names"

export type TEthers = typeof ethers & HardhatEthersHelpers;

declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    // just refine the ethers type; don't redefine deployments/etc.
    ethers: TEthers;
  }
}

// --- env & defaults ---
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY ?? "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY ?? "";
const ZKEVM_API_KEY = process.env.ZKEVM_API_KEY ?? "";
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY ?? "";

const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// helper
const ac = (path: string) => `https://${path}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

const config: HardhatUserConfig = {
  // "hardhat" is the usual default for local dev. Keep "localhost" if you always run an external node.
  defaultNetwork: "hardhat",

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./generated/cache",
    artifacts: "./generated/artifacts",
    // these two are used by hardhat-deploy:
    // deploy: "./deploy",
    // deployments: "./generated/deployments",
  },

  solidity: {
    // keep your version matrix
    compilers: [
      { version: "0.8.27" },
      { version: "0.8.25" },
      { version: "0.8.24" },
      { version: "0.8.23" },
      { version: "0.8.22" },
      { version: "0.8.21" },
      { version: "0.8.20" },
      { version: "0.8.19" },
      { version: "0.8.18" },
      { version: "0.8.17" },
      { version: "0.8.16" },
      { version: "0.8.15" },
    ],
    // global solc settings applied to all compilers
    settings: {
      optimizer: { enabled: true, runs: 200 },
      outputSelection: {
        "*": { "*": ["abi", "evm.bytecode", "evm.bytecode.sourceMap", "metadata"] },
      },
    },
  },

  namedAccounts: {
    deployer: { default: 0 },
  },

  networks: {
    hardhat: {
      gas: "auto",
      allowUnlimitedContractSize: false,
      loggingEnabled: true,
      live: false,
      saveDeployments: true,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
      tags: ["test", "local"],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [DEPLOYER_PRIVATE_KEY],
    },

    // Ethereum
    mainnet: { url: ac("eth-mainnet"), accounts: [DEPLOYER_PRIVATE_KEY] },
    sepolia: { url: ac("eth-sepolia"), accounts: [DEPLOYER_PRIVATE_KEY] },

    // Arbitrum
    arbitrum: { url: ac("arb-mainnet"), accounts: [DEPLOYER_PRIVATE_KEY] },
    arbitrumSepolia: { url: ac("arb-sepolia"), accounts: [DEPLOYER_PRIVATE_KEY] },

    // Optimism
    optimism: { url: ac("opt-mainnet"), accounts: [DEPLOYER_PRIVATE_KEY] },
    optimismSepolia: { url: ac("opt-sepolia"), accounts: [DEPLOYER_PRIVATE_KEY] },

    // Polygon PoS
    polygon: { url: ac("polygon-mainnet"), accounts: [DEPLOYER_PRIVATE_KEY] },
    // Mumbai is deprecated; prefer Amoy. Keep if you still need it.
    polygonMumbai: { url: ac("polygon-mumbai"), accounts: [DEPLOYER_PRIVATE_KEY] },
    polygonAmoy: { url: ac("polygon-amoy"), accounts: [DEPLOYER_PRIVATE_KEY] },

    // Polygon zkEVM
    polygonZkEvm: { url: ac("polygonzkevm-mainnet"), accounts: [DEPLOYER_PRIVATE_KEY] },
    polygonZkEvmTestnet: { url: ac("polygonzkevm-testnet"), accounts: [DEPLOYER_PRIVATE_KEY] },

    // Gnosis
    gnosis: { url: "https://rpc.gnosischain.com", accounts: [DEPLOYER_PRIVATE_KEY] },
    chiado: { url: "https://rpc.chiadochain.net", accounts: [DEPLOYER_PRIVATE_KEY] },

    // Base
    base: { url: "https://mainnet.base.org", accounts: [DEPLOYER_PRIVATE_KEY] },
    baseSepolia: { url: "https://sepolia.base.org", accounts: [DEPLOYER_PRIVATE_KEY] },

    // Scroll
    scroll: { url: "https://rpc.scroll.io", accounts: [DEPLOYER_PRIVATE_KEY] },
    scrollSepolia: { url: "https://sepolia-rpc.scroll.io", accounts: [DEPLOYER_PRIVATE_KEY] },

    // PGN
    pgn: { url: "https://rpc.publicgoods.network", accounts: [DEPLOYER_PRIVATE_KEY] },
    pgnTestnet: { url: "https://sepolia.publicgoods.network", accounts: [DEPLOYER_PRIVATE_KEY] },
  },

  // @nomicfoundation/hardhat-verify (a.k.a. hardhat-verify) config
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      polygonAmoy: POLYGONSCAN_API_KEY,
      base: BASESCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY,
      polygonZkEvm: ZKEVM_API_KEY,
      polygonZkEvmTestnet: ZKEVM_API_KEY,
    },
    customChains: [
      // Base (Explorer: BaseScan)
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },

      // Polygon zkEVM
      {
        network: "polygonZkEvm",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com",
        },
      },
      {
        network: "polygonZkEvmTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com",
        },
      },

      // Polygon Amoy (in case your hardhat-verify version needs customChains)
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },

      // (Fix bad http URL) Sepolia Etherscan override — not strictly needed, but fine:
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io",
        },
      },
    ],
  },

  // hardhat-deploy verify fallback (rarely needed when using hardhat-verify above)
  verify: {
    etherscan: { apiKey: ETHERSCAN_API_KEY },
  },

  sourcify: { enabled: false },

  // --- plugin configs (moved out of solidity.settings) ---
  typechain: {
    outDir: "./generated/contract-types",
    target: "ethers-v6", // switch to v5 if you're still on ethers v5
    alwaysGenerateOverloads: false,
    externalArtifacts: [],
  },

  gasReporter: {
    currency: "USD",
    showTimeSpent: true,
    enabled: !!process.env.REPORT_GAS,
    coinmarketcap: process.env.CMC_API_KEY, // optional
    src: "./contracts",
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },

  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: false,
  },

  abiExporter: {
    path: "./artifacts/abi",
    clear: true,
    flat: true,
    spacing: 2,
    watch: true,
    only: ["*"],
  },

  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts", "./test", "./hardhat.config.ts", "./scripts"],
      verbose: true,
    },
  },

  mocha: {
    timeout: 60_000,
    // prefer using hardhat-gas-reporter plugin; leaving mocha reporter default
  },
};

// ---------------- custom tasks (use task(), not a "tasks" key) ----------------
task("save-addresses", "Save deployment addresses to a JSON file")
  .addParam("outputFile", "Path to the output JSON file")
  .setAction(async ({ outputFile }, hre) => {
    const { deployments } = hre;
    const fs = await import("fs/promises");
    const contracts = await deployments.all();

    const addresses: Record<string, any> = {};
    for (const name of Object.keys(contracts)) {
      addresses[name] = contracts[name].address;
    }
    await fs.writeFile(outputFile, JSON.stringify(addresses, null, 2));
    console.log(`Addresses saved to ${outputFile}`);
  });

task("verify-contracts", "Verify all hardhat-deploy deployments via hardhat-verify").setAction(
  async (_, hre) => {
    const { deployments, run } = hre;
    const contracts = await deployments.all();
    for (const name of Object.keys(contracts)) {
      const d = contracts[name];
      if (d.address) {
        try {
          await run("verify:verify", {
            address: d.address,
            constructorArguments: (d.args as any[]) ?? [],
          });
          console.log(`Verified: ${name} @ ${d.address}`);
        } catch (e: any) {
          console.warn(`Skipping ${name}: ${e.message ?? e}`);
        }
      }
    }
  }
);

export default config;

*/