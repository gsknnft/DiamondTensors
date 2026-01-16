// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20Upgradeable as IERC20} from "gnus.ai/contracts-upgradeable-diamond/contracts/token/ERC20/IERC20Upgradeable.sol";
import {ERC20} from "@openzeppelin-5.0.1/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin-5.0.1/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin-5.0.1/contracts/access/AccessControl.sol";
import {EIP712} from "@openzeppelin-5.0.1/contracts/utils/cryptography/EIP712.sol";
import {MessageHashUtils} from "@openzeppelin-5.0.1/contracts/utils/cryptography/MessageHashUtils.sol";
import {ECDSA} from "@openzeppelin-5.0.1/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title MinimalTrustedBridge
 * @notice Lock/Mint bridge with a trusted relayer set. Nonces prevent replay.
 *         Options:
 *          - Lock canonical ERC20 on source, Mint wrapped on dest.
 *          - Burn wrapped on dest, Unlock canonical on source.
 * @dev Do not use this as a trustless bridge. This is "trusted signer(s)" model.
 */
contract MinimalTrustedBridge is AccessControl, EIP712 {
    using SafeERC20 for IERC20;

    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    /// @notice chainId this contract believes it is on (immutable context)
    uint256 public immutable localChainId;

    /// @notice mapping of processed nonces to prevent replay: srcChainId => nonce => consumed
    mapping(uint256 => mapping(bytes32 => bool)) public consumed;

    event Locked(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 dstChainId,
        address indexed dstUser,
        bytes32 nonce
    );

    event Unlocked(address indexed to, address indexed token, uint256 amount, bytes32 nonce);
    event Minted(address indexed to, address indexed token, uint256 amount, bytes32 nonce);
    event Burned(address indexed from, address indexed token, uint256 amount, bytes32 nonce);

    constructor(address admin) EIP712("MinimalTrustedBridge", "1") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        localChainId = block.chainid;
    }

    /**
     * @notice Lock ERC20 on this chain. Off-chain relayer will mint on the destination chain.
     * @param token ERC20 address to lock.
     * @param amount Amount to lock.
     * @param dstChainId Destination chainId.
     * @param dstUser Recipient on destination.
     * @param nonce Unique value per transfer (user-provided or off-chain assigned).
     */
    function lock(
        address token,
        uint256 amount,
        uint256 dstChainId,
        address dstUser,
        bytes32 nonce
    ) external {
        require(amount > 0, "amount=0");
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        emit Locked(msg.sender, token, amount, dstChainId, dstUser, nonce);
    }

    /**
     * @notice Unlock previously bridged funds on this chain (reverse direction).
     * @dev Requires a relayer signature authorizing the unlock.
     */
    function unlock(
        address token,
        address to,
        uint256 amount,
        uint256 srcChainId,
        bytes32 nonce,
        bytes calldata relayerSig
    ) external {
        bytes32 digest = _unlockDigest(token, to, amount, srcChainId, nonce);
        _consume(srcChainId, nonce, digest, relayerSig);
        IERC20(token).safeTransfer(to, amount);
        emit Unlocked(to, token, amount, nonce);
    }

    /**
     * @notice Mint wrapped tokens on this chain (destination) for a lock on the source chain.
     * @dev Your wrapped token must be mintable by this bridge.
     */
    function mintWrapped(
        address wrappedToken,
        address to,
        uint256 amount,
        uint256 srcChainId,
        bytes32 nonce,
        bytes calldata relayerSig
    ) external {
        bytes32 digest = _mintDigest(wrappedToken, to, amount, srcChainId, nonce);
        _consume(srcChainId, nonce, digest, relayerSig);
        ERC20MintableLike(wrappedToken).mint(to, amount);
        emit Minted(to, wrappedToken, amount, nonce);
    }

    /**
     * @notice Burn wrapped tokens to return to the source chain (relayer will unlock on source).
     */
    function burnWrapped(
        address wrappedToken,
        uint256 amount,
        uint256 dstChainId,
        address dstUser,
        bytes32 nonce
    ) external {
        ERC20MintableLike(wrappedToken).burnFrom(msg.sender, amount);
        emit Burned(msg.sender, wrappedToken, amount, nonce);
        // relayer watches and later calls `unlock` on the source chain’s bridge
    }

    // --------- internals ---------

    function _consume(
        uint256 srcChainId,
        bytes32 nonce,
        bytes32 digest,
        bytes calldata relayerSig
    ) internal {
        require(!consumed[srcChainId][nonce], "replay");
        address signer = ECDSA.recover(digest, relayerSig);
        require(hasRole(RELAYER_ROLE, signer), "bad signer");
        consumed[srcChainId][nonce] = true;
    }

    // EIP-712 typed digests (protects the message context)
    function _unlockDigest(
        address token, address to, uint256 amount, uint256 srcChainId, bytes32 nonce
    ) internal view returns (bytes32) {
        bytes32 TYPEHASH = keccak256("Unlock(address token,address to,uint256 amount,uint256 srcChainId,uint256 localChainId,bytes32 nonce)");
        bytes32 structHash = keccak256(abi.encode(TYPEHASH, token, to, amount, srcChainId, localChainId, nonce));
        return MessageHashUtils.toTypedDataHash(_domainSeparatorV4(), structHash);
    }

    function _mintDigest(
        address token, address to, uint256 amount, uint256 srcChainId, bytes32 nonce
    ) internal view returns (bytes32) {
        bytes32 TYPEHASH = keccak256("Mint(address token,address to,uint256 amount,uint256 srcChainId,uint256 localChainId,bytes32 nonce)");
        bytes32 structHash = keccak256(abi.encode(TYPEHASH, token, to, amount, srcChainId, localChainId, nonce));
        return MessageHashUtils.toTypedDataHash(_domainSeparatorV4(), structHash);
    }
}

interface ERC20MintableLike {
    function mint(address to, uint256 amount) external;
    function burnFrom(address from, uint256 amount) external;
}
