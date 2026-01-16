import assert from "node:assert/strict";
import { before, describe, it } from "node:test";

import { network } from "hardhat";
import { encodePacked, getContract, keccak256, type Hex } from "viem";

describe("ComponentsHarness (registry + NFT binding)", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [ownerClient, otherClient] = await viem.getWalletClients();
  const owner = ownerClient.account.address;

  const components = await viem.deployContract("ComponentsHarness");
  const componentsOther = getContract({
    address: components.address,
    abi: components.abi,
    client: { wallet: otherClient, public: publicClient },
  });

  const nft = await viem.deployContract("MockERC721");

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
  const zeroBytes32 = `0x${"0".repeat(64)}` as Hex;

  before(async () => {
    const shape2x2 = [2n, 2n];
    await waitFor(await components.write.createTensor([2, shape2x2, seedA, 1n]));
    await waitFor(await components.write.createTensor([2, shape2x2, seedB, 1n]));

    await waitFor(await nft.write.mint([owner, 1n]));
    await waitFor(await nft.write.mint([owner, 2n]));
    await waitFor(await nft.write.mint([otherClient.account.address, 3n]));
  });

  it("capsule registry appends and returns latest", async () => {
    await assert.rejects(
      () => components.read.latestCapsule([tensorAId]),
      /no capsules/
    );

    const root1 = keccak256(encodePacked(["string"], ["capsule-1"]));
    const root2 = keccak256(encodePacked(["string"], ["capsule-2"]));

    await waitFor(await components.write.registerCapsule([tensorAId, root1]));
    await waitFor(await components.write.registerCapsule([tensorAId, root2]));

    const count = await components.read.capsuleCount([tensorAId]);
    assert.equal(count, 2n);

    const first = await components.read.capsuleAt([tensorAId, 0n]);
    assert.equal(first.capsuleRoot, root1);

    const latest = await components.read.latestCapsule([tensorAId]);
    assert.equal(latest.capsuleRoot, root2);
  });

  it("capsule registry enforces ownership", async () => {
    const root = keccak256(encodePacked(["string"], ["capsule-3"]));
    await assert.rejects(
      () => componentsOther.write.registerCapsule([tensorAId, root]),
      /not owner/
    );
  });

  it("NFT binding enforces ownership and immutability", async () => {
    await waitFor(
      await components.write.bindNFT([nft.address, 1n, tensorAId, false])
    );
    assert.equal(await components.read.tensorOf([nft.address, 1n]), tensorAId);

    await waitFor(
      await components.write.rebindNFT([nft.address, 1n, tensorBId])
    );
    assert.equal(await components.read.tensorOf([nft.address, 1n]), tensorBId);

    await waitFor(await components.write.unbindNFT([nft.address, 1n]));
    const binding = await components.read.getBinding([nft.address, 1n]);
    assert.equal(binding.tensorId, zeroBytes32);

    await waitFor(
      await components.write.bindNFT([nft.address, 2n, tensorAId, true])
    );

    await assert.rejects(
      () => components.write.rebindNFT([nft.address, 2n, tensorBId]),
      /binding immutable/
    );

    await assert.rejects(
      () => components.write.unbindNFT([nft.address, 2n]),
      /binding immutable/
    );

    await assert.rejects(
      () => componentsOther.write.bindNFT([nft.address, 1n, tensorAId, false]),
      /not NFT owner/
    );
  });
});

describe("CapsuleDiamondFacet", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [ownerClient, otherClient] = await viem.getWalletClients();
  const owner = ownerClient.account.address;

  const verifier = await viem.deployContract("MockProofVerifier");
  const capsule = await viem.deployContract("CapsuleDiamondFacet", [
    verifier.address,
  ]);

  const capsuleOther = getContract({
    address: capsule.address,
    abi: capsule.abi,
    client: { wallet: otherClient, public: publicClient },
  });

  const waitFor = async (hash: Hex) => {
    await publicClient.waitForTransactionReceipt({ hash });
  };

  it("accepts valid capsules and blocks replay", async () => {
    await waitFor(await verifier.write.setResult([true]));

    const root = keccak256(encodePacked(["string"], ["root-1"]));
    const stateHash = keccak256(encodePacked(["string"], ["state-1"]));
    const capsuleData = {
      root,
      stateHash,
      sender: owner,
      nonce: 1n,
      srcChainId: 1n,
      srcSlot: 1n,
    };

    await waitFor(await capsule.write.submitCapsule([capsuleData, "0x1234"]));

    await assert.rejects(
      () => capsule.write.submitCapsule([capsuleData, "0x1234"]),
      /replay/
    );
  });

  it("rejects invalid proofs and non-owner verifier updates", async () => {
    await waitFor(await verifier.write.setResult([false]));

    const root = keccak256(encodePacked(["string"], ["root-2"]));
    const stateHash = keccak256(encodePacked(["string"], ["state-2"]));
    const capsuleData = {
      root,
      stateHash,
      sender: owner,
      nonce: 2n,
      srcChainId: 1n,
      srcSlot: 2n,
    };

    await assert.rejects(
      () => capsule.write.submitCapsule([capsuleData, "0x1234"]),
      /invalid proof/
    );

    await assert.rejects(
      () => capsuleOther.write.setVerifier([verifier.address]),
      /not owner/
    );
  });
});
