import { BaseContract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

export const deployContract = async function (
  contractName: string,
  constructorArgs?: any[]
): Promise<BaseContract> {
  let factory: ContractFactory;
  try {
    factory = await ethers.getContractFactory(contractName);
  } catch (e) {
    factory = await ethers.getContractFactory(
      contractName + "UpgradeableWithInit"
    );
  }
  const contract = await factory.deploy(...(constructorArgs || []));
  await contract.waitForDeployment();
  return contract;
};

export const getBlockTimestamp = async function (): Promise<number> {
  const latestBlock = await ethers.provider.getBlock("latest");
  if (!latestBlock?.timestamp) {
    throw new Error("Could not fetch block timestamp");
  }
  return Number(latestBlock.timestamp);
};

export const mineBlockTimestamp = async function (
  timestamp: number
): Promise<void> {
  await ethers.provider.send("evm_setNextBlockTimestamp", [timestamp]);
  await ethers.provider.send("evm_mine", []);
};

export const offsettedIndex = function (
  startTokenId: number,
  arr: number[]
): bigint | bigint[] {
  if (arr.length === 1) {
    return BigInt(startTokenId + arr[0]);
  }
  return arr.map((num) => BigInt(startTokenId + num));
};
