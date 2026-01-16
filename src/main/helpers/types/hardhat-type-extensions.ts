
import { ethers } from 'ethers';

import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@tenderly/hardhat-tenderly';
import 'hardhat-deploy';

import { HardhatEthersHelpers } from '@nomicfoundation/hardhat-ethers/types';

import 'hardhat-deploy/src/type-extensions';
import { HardhatRuntimeEnvironment } from 'hardhat/types/hre';

export type ContractJson = {
  _format: string;
  contractName: string;
  abi: Record<string, object>[];
  bytecode: string;
  deployedBytecode: string;
  linkReferences: Record<string, object>;
  deployedLinkReferences: Record<string, object>;
  address: string;
};

export type { HardhatRuntimeEnvironment as hre };

export type TEthers = typeof ethers & HardhatEthersHelpers;
