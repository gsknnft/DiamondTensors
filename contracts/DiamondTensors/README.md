# DiamondTensors

This is a tensor memory substrate for the EVM, not an ML framework. The goal
is persistent, provenance-aware tensor storage and deterministic computation.

## Status

- Implementation: `IMPLEMENTATION.md` (current spec plus benchmarks)
- Official EIP format: `EIP.md`
- Template: `EIP_TEMPLATE.md`
- Benchmarks: `../../BENCHMARKS.md`

## Core Concepts

- Tensor: multi-dimensional structured memory with deterministic identifiers.
- Capsule: cryptographic commitment to frozen tensor state.
- Facets: manager, read, write, batch, math, capsule, registry, NFT binding.

## Why Use DiamondTensors vs IPFS Pointers

IPFS pointers give you cheap storage and retrieval, but the token does not own
state or computation. DiamondTensors is for cases where the on-chain state
itself is the asset, not just a pointer:

- On-chain state is first-class and verifiable, not off-chain and mutable.
- Deterministic computation and provenance live with the data.
- Ownership gates mutation and capsule registration on-chain.
- State transitions are replayable and auditable.

Use IPFS when you only need static media. Use DiamondTensors when you need
on-chain state, provenance, and deterministic computation.

## Storage and Backends

- Dense slot storage: `mapping(bytes32 => mapping(uint256 => int256))`
- Bytecode payload backend (SSTORE2-style) for immutable dense payloads.
- Packed uint8 backend: 32 elements per slot for byte-sized tensors.
- Backend selection is per tensor; payloads are immutable once written.
- Reads resolve to packed payload, then bytecode payload, then slot storage.

## What You Can Build

- Agentic memory: persistent, provenance-aware state for agents and wallets.
- Dynamic NFTs: mutable, on-chain state with deterministic updates.
- Verifiable computation graphs: capsules as checkpoints and proofs.
- Cross-chain state teleportation: capsule roots as portable commitments.
- Data registries: audit trails, lineage, and versioned state snapshots.

## Merkle Provenance (Optional)

Merkle roots can summarize provenance for:

- Capsule registry entries (membership proofs over time).
- Chunk manifests for off-chain payloads.
- Sparse updates or operation logs.

Merkle roots do not make dense payloads cheaper on L1. Use them for verifiable
metadata, not bulk storage, and keep leaf ordering deterministic and append-only.

## NFT Ownership and Marketplaces

DiamondTensors is a data primitive, not an NFT standard. To surface it in
marketplaces, you wrap or bind it to ERC-721 or ERC-1155:

- `NFTBindingFacet` lets an NFT point to a tensor, so ownership of the NFT gates
  mutation and capsule registration.
- Marketplaces read `tokenURI`. You can serve a standard JSON metadata response
  that points to on-chain data (data URI, on-chain renderer, or indexed view).
- If the data is on-chain, users own the state via their wallet or NFT; if the
  data is off-chain, ownership is only as strong as the off-chain custody model.

If you are building agentic identities, you can treat the wallet or NFT as the
authority and the tensor as the agent memory, with capsules providing audit and
replay.

## L1 Storage Reality (Why 1 MB Does Not Fit)

Ethereum storage is permanent, replicated state. You pay for global, forever
replication, not disk space. Benchmarks in this repo show:

- Dense int256 writes are ~24k gas per element (SSTORE bound).
- Packed uint8 writes are ~800 gas per byte; reads are ~100 gas per byte.

A 1 MB packed uint8 payload is ~800,000,000 gas to write and ~100,000,000 gas
to read, far above the ~30M gas block limit. L1 patterns are:

- Small inline payloads (SVGs, shaders, tiny audio snippets).
- Packed headers + chunk manifests + hashes on-chain.
- Large media stored off-chain but cryptographically bound.
- Dense media stored on L2/validium/app-chain backends.

## Quick Start

Run Hardhat tests:

```powershell
cmd /c pnpm.cmd --filter @chain-adapters/evm exec hardhat test
```

Run TFJS parity tests:

```powershell
cmd /c pnpm.cmd exec vitest run packages/adapters/evm/contracts/tests/TensorEquivalence.test.ts
```

Run gas benchmarks:

```powershell
cmd /c pnpm.cmd --filter @chain-adapters/evm exec hardhat run scripts/benchmarks/tensorMathGas.ts
```

## Security Posture

- Ownership checks are required before mutation or capsule registration.
- External ownership checks may be adversarial and may revert.
- Capsule acceptance events must follow successful verification only.
- Reentrancy regression tests cover NFT binding and verifier callbacks.

## Optional Hardening

- Solidity coverage (backend selection, payload vs slot equivalence, capsule hashing).
- Gas reporter for per-test cost snapshots.
- Backend selector flags for explicit on-chain backend metadata.
