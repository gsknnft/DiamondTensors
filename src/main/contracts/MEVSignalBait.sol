// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title MEVSignalBait
 * @notice Emits highly visible, mempool-observable "intent" while allowing
 *         conditional revert for gas-cheap lure, or conditional pass-through
 *         to a router for real execution. Designed for decoy + sniping flows.
 */
interface IRouterLike {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

interface IERC20 {
    function approve(address spender, uint value) external returns (bool);
    function transferFrom(address src, address dst, uint value) external returns (bool);
    function balanceOf(address who) external view returns (uint);
}

contract MEVSignalBait {
    event BaitAnnounce(
        address indexed sender,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 minOut,
        uint256 timestamp,
        bytes32 salt
    );

    address public immutable router; // e.g., UniswapV2Router02
    address public owner;

    constructor(address _router) {
        require(_router != address(0), "router=0");
        router = _router;
        owner  = msg.sender;
    }

    /// @notice Pulls tokens from user and either reverts intentionally (bait)
    ///         or routes the swap (if guard passes). Emits BaitAnnounce always.
    /// @param tokenIn ERC20 being sold
    /// @param tokenOut ERC20 being bought
    /// @param amountIn amount to sell
    /// @param minOut minimum expected out (for real swap path)
    /// @param deadline unix ts; enforced only when executing the real swap
    /// @param revertGuard if true, forcibly revert (visible to bots in mempool)
    /// @param timeParity 0=no check, 1=require odd timestamp, 2=require even
    /// @param salt arbitrary noise to diversify calldata for signature scrapers
    function baitOrSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minOut,
        uint256 deadline,
        bool revertGuard,
        uint8  timeParity,
        bytes32 salt
    ) external {
        emit BaitAnnounce(msg.sender, tokenIn, tokenOut, amountIn, minOut, block.timestamp, salt);

        // Pull tokens for either path (revert path still shows intent)
        require(IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn), "pull fail");

        // Optional parity constraint (forces revert half the time)
        if (timeParity == 1) {
            require(block.timestamp % 2 == 1, "bait:odd");
        } else if (timeParity == 2) {
            require(block.timestamp % 2 == 0, "bait:even");
        }

        // Hard bait
        if (revertGuard) {
            revert("bait");
        }

        // Real swap path (visible AND settles)
        address;
        path[0] = tokenIn;
        path[1] = tokenOut;

        IERC20(tokenIn).approve(router, amountIn);
        uint[] memory amounts = IRouterLike(router).swapExactTokensForTokens(
            amountIn,
            minOut,
            path,
            msg.sender,
            deadline
        );

        // Any remainder stays here; owner can recover.
        (amounts);
    }

    function rescue(address token, address to, uint256 amount) external {
        require(msg.sender == owner, "only owner");
        require(IERC20(token).transferFrom(address(this), to, amount), "rescue fail");
    }
}
