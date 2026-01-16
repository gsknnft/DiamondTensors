# Benchmarks

This folder captures local, reproducible gas benchmarks for the DiamondTensors
facets. These numbers are intended to validate backend limits and guide
architecture decisions; they are not a mainnet deployment recommendation.

## How to Run

```powershell
cmd /c pnpm.cmd --filter @chain-adapters/evm exec hardhat run scripts/benchmarks/tensorMathGas.ts
```

Optional parameters:

```powershell
$env:GAS_PRICE_GWEI="20"
$env:ETH_PRICE_USD="3000"
$env:BATCH_CHUNK="256"
cmd /c pnpm.cmd --filter @chain-adapters/evm exec hardhat run scripts/benchmarks/tensorMathGas.ts
```

## Outputs

- `packages/adapters/evm/scripts/benchmarks/output/tensorMathGas.csv`
- `packages/adapters/evm/scripts/benchmarks/output/tensorMathGas.md`

The output tables include:
- Dense batchSet/batchGet for 2x2, 4x4, 8x8, 16x16, 32x32.
- add/scale/dot where feasible.
- Payload write/read (SSTORE2-style bytecode).
- Packed uint8 write/read (32 elements per slot).
- Sparse batchSet/batchGet for 32x32 at 1%, 5%, 10% density.
- Single-call vs chunked batch mode.

## Interpretation Notes

- Dense writes hit the SSTORE floor (~20k gas/slot + overhead). This is a
  storage-backend limit, not a facet optimization issue.
- Dense add/scale on 32x32 exceeds the L1 block gas limit.
- Sparse updates and reads remain viable and are the near-term path for L1.
- Payload writes (bytecode) reduce dense write costs but still exceed L1 limits
  at 32x32 int256 payloads.
- Packed uint8 writes/read materially reduce costs; 32x32 packed writes are
  sub-1M gas in the current harness.
- Backend changes (bytecode storage, packing, external DA) are required to make
  dense tensors practical.
