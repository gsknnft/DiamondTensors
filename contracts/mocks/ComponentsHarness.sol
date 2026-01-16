// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {TensorManagerFacet} from "../DiamondTensors/TensorManagerFacet.sol";
import {CapsuleRegistryFacet} from "../DiamondTensors/components/CapsuleRegistryFacet.sol";
import {NFTBindingFacet} from "../DiamondTensors/components/NFTBindingFacet.sol";

/// @notice Test-only harness that composes component facets into one contract.
contract ComponentsHarness is
    TensorManagerFacet,
    CapsuleRegistryFacet,
    NFTBindingFacet
{}
