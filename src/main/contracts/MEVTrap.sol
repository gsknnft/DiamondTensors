// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

/**
 * @title MEVTrap
 * @dev This contract lures MEV bots by appearing profitable, but traps their txs based on conditions.
 */
contract MEVTrap {
    address public immutable baitToken;
    address public owner;

    constructor(address _baitToken) {
        baitToken = _baitToken;
        owner = msg.sender;
    }

    function baitSwap(uint256 amount) external {
        require(tx.origin != msg.sender, "no contracts"); // blocks flashbots
        require(block.timestamp % 2 == 1, "bait failed"); // fails half the time

        // Pretend to transfer bait token
        IERC20(baitToken).transfer(msg.sender, amount / 10);
    }

    function withdraw() external {
        require(msg.sender == owner, "not owner");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
