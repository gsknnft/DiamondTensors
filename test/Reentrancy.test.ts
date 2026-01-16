import assert from "node:assert/strict";
import { before, describe, it } from "node:test";

import { network } from "hardhat";
import {
  encodeFunctionData,
  encodePacked,
  keccak256,
  type Hex,
} from "viem";

describe("Reentrancy regression: NFT ownerOf", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [ownerClient] = await viem.getWalletClients();
  const owner = ownerClient.account.address;

  const components = await viem.deployContract("ComponentsHarness");
  const nft = await viem.deployContract("MaliciousERC721");

  const waitFor = async (hash: Hex) => {
    await publicClient.waitForTransactionReceipt({ hash });
  };

  const tensorId = (seed: Hex, nonce: bigint) =>
    keccak256(
      encodePacked(
        ["string", "address", "bytes32", "uint64"],
        ["TENSOR", owner, seed, nonce]
      )
    );

  const seedA = `0x${"11".repeat(32)}` as Hex;
  const seedB = `0x${"22".repeat(32)}` as Hex;
  const tensorAId = tensorId(seedA, 1n);
  const tensorBId = tensorId(seedB, 1n);

  before(async () => {
    const shape2x2 = [2n, 2n];
    await waitFor(await components.write.createTensor([2, shape2x2, seedA, 1n]));
    await waitFor(await components.write.createTensor([2, shape2x2, seedB, 1n]));
    await waitFor(await nft.write.mint([owner, 1n]));
  });

  it("bindNFT is not vulnerable to reentrancy from ownerOf", async () => {
    const reenterData = encodeFunctionData({
      abi: components.abi,
      functionName: "bindNFT",
      args: [nft.address, 1n, tensorBId, false],
    });

    await waitFor(
      await nft.write.setReenter([components.address, reenterData, true])
    );

    await waitFor(
      await components.write.bindNFT([nft.address, 1n, tensorAId, false])
    );

    const bound = await components.read.tensorOf([nft.address, 1n]);
    assert.equal(bound, tensorAId);
  });
});

describe("Reentrancy regression: CapsuleDiamondFacet verifier", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [ownerClient] = await viem.getWalletClients();
  const owner = ownerClient.account.address;

  const verifier = await viem.deployContract("MaliciousVerifier");
  const capsule = await viem.deployContract("CapsuleDiamondFacet", [
    verifier.address,
  ]);

  const waitFor = async (hash: Hex) => {
    await publicClient.waitForTransactionReceipt({ hash });
  };

  it("submitCapsule succeeds even if verifier attempts reentrancy", async () => {
    const capsuleData = {
      root: keccak256(encodePacked(["string"], ["root-reenter"])),
      stateHash: keccak256(encodePacked(["string"], ["state-reenter"])),
      sender: owner,
      nonce: 1n,
      srcChainId: 1n,
      srcSlot: 1n,
    };

    const reenterData = encodeFunctionData({
      abi: capsule.abi,
      functionName: "submitCapsule",
      args: [capsuleData, "0x1234"],
    });

    await waitFor(
      await verifier.write.setReenter([capsule.address, reenterData, true])
    );

    await waitFor(await capsule.write.submitCapsule([capsuleData, "0x1234"]));

    await assert.rejects(
      () => capsule.write.submitCapsule([capsuleData, "0x1234"]),
      /replay/
    );
  });
});
