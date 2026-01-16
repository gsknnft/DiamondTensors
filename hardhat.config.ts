import hardhatNodeTestRunner from "@nomicfoundation/hardhat-node-test-runner";
import hardhatViem from "@nomicfoundation/hardhat-viem";
import { configVariable, defineConfig } from "hardhat/config";

// --- env & defaults ---
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY ?? "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY ?? "";
const ZKEVM_API_KEY = process.env.ZKEVM_API_KEY ?? "";
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY ?? "";

const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const ac = (path: string) => `https://${path}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

const SOLC_COMPILERS = [
  "0.8.30",
  "0.8.29",
  "0.8.28",
  "0.8.27",
  "0.8.25",
  "0.8.24",
  "0.8.23",
  "0.8.22",
  "0.8.21",
  "0.8.20",
  "0.8.19",
  "0.8.18",
  "0.8.17",
  "0.8.16",
  "0.8.15",
];

const SOLC_SETTINGS = {
  optimizer: { enabled: true, runs: 200 },
  outputSelection: {
    "*": { "*": ["abi", "evm.bytecode", "evm.bytecode.sourceMap", "metadata"] },
  },
};

export default defineConfig({
  plugins: [hardhatViem, hardhatNodeTestRunner],
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: {
    compilers: SOLC_COMPILERS.map((version) => ({
      version,
      settings: SOLC_SETTINGS,
    })),
    // overrides: {
    //   "contracts/optimism/OptimismPortal.sol": {
    //     version: "0.8.19",
    //     settings: {},
    //   },
    // },
    // version: "0.8.27",
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
      gas: 'auto',
      loggingEnabled: true,
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    localhost: {
      type: "http",
      chainType: "l1",
      url: "http://127.0.0.1:8545",
    },
    mainnet: { 
      type: "http", 
      chainType: "l1",
      url: ac("eth-mainnet"), 
      accounts: [DEPLOYER_PRIVATE_KEY] 
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")]
    },
    base: {
      type: "http",
      chainType: "op",
      url: configVariable("BASE_RPC_URL"),
      accounts: [configVariable("BASE_PRIVATE_KEY")]
    }
  },
  test: {
    solidity: {
      timeout: 40000,
      // other solidity tests options
    },
  },
});
