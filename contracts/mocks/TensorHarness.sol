// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {TensorManagerFacet} from "../DiamondTensors/TensorManagerFacet.sol";
import {TensorReadFacet} from "../DiamondTensors/TensorReadFacet.sol";
import {TensorWriteFacet} from "../DiamondTensors/TensorWriteFacet.sol";
import {TensorBatchFacet} from "../DiamondTensors/TensorBatchFacet.sol";
import {TensorMathFacet} from "../DiamondTensors/TensorMathFacet.sol";
import {TensorSSTORE2Facet} from "../DiamondTensors/backends/TensorSSTORE2Facet.sol";
import {CapsuleFacet} from "../DiamondTensors/components/CapsuleFacet.sol";
import {TensorPackedU8Facet} from "../DiamondTensors/backends/TensorPackedU8Facet.sol";

/// @notice Test-only harness that composes core facets into one contract.
contract TensorHarness is
    TensorManagerFacet,
    TensorReadFacet,
    TensorWriteFacet,
    TensorBatchFacet,
    TensorMathFacet,
    TensorSSTORE2Facet,
    CapsuleFacet,
    TensorPackedU8Facet
{}
