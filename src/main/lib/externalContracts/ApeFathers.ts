export default {
  address: '0xE128cA01CcEb08f1b0a58C628d841Bc0EF0A4b80',
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_contractOwner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_diamondCutFacet',
          type: 'address',
        },
      ],
      stateMutability: 'payable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'ApprovalCallerNotOwnerNorApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ApprovalQueryForNonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'BalanceQueryForZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'BurnClaimIsNotActive',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'BurnFailed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'CannotClaimTokenYouDontHold',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_initializationContractAddress',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: '_calldata',
          type: 'bytes',
        },
      ],
      name: 'InitializationFunctionReverted',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidClaim',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintERC2309QuantityExceedsLimit',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintToZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintZeroQuantity',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'OwnerOfTokenCallFailed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OwnerQueryForNonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'OwnershipNotInitializedForExtraData',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TokenCountVerificationFailed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferCallerNotOwnerNorApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferFromIncorrectOwner',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferToNonERC721ReceiverImplementer',
      type: 'error',
    },
    {
      inputs: [],
      name: 'TransferToZeroAddress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'URIQueryForNonexistentToken',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'numberMinted',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
      ],
      name: 'BurnClaimComplete',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'burner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Burned',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'fromTokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'toTokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'ConsecutiveTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'contractAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'bool',
          name: 'success',
          type: 'bool',
        },
        {
          indexed: false,
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'ContractUpgradeRejected',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'contractAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'bool',
          name: 'success',
          type: 'bool',
        },
        {
          indexed: false,
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'ContractUpgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'facetAddress',
              type: 'address',
            },
            {
              internalType: 'enum IDiamondCut.FacetCutAction',
              name: 'action',
              type: 'uint8',
            },
            {
              internalType: 'bytes4[]',
              name: 'functionSelectors',
              type: 'bytes4[]',
            },
          ],
          indexed: false,
          internalType: 'struct IDiamondCut.FacetCut[]',
          name: '_diamondCut',
          type: 'tuple[]',
        },
        {
          indexed: false,
          internalType: 'address',
          name: '_init',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: '_calldata',
          type: 'bytes',
        },
      ],
      name: 'DiamondCut',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'contractAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'contractOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'bool',
          name: 'initialized',
          type: 'bool',
        },
      ],
      name: 'DiamondInitialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address[]',
          name: '_facets',
          type: 'address[]',
        },
      ],
      name: 'DiamondLoupeFacetsChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      name: 'Minted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Paused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Received',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'contractAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'contractOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'bool',
          name: 'initialized',
          type: 'bool',
        },
      ],
      name: 'Stage1Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'TokenTransferFailed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Unpaused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: '_OwnershipTransferred',
      type: 'event',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_version',
          type: 'string',
        },
      ],
      name: '_authorizeUpgrade',
      outputs: [
        {
          internalType: 'bool',
          name: 'success',
          type: 'bool',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'baseURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: '_tokenIds',
          type: 'uint256[]',
        },
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
      ],
      name: 'batchTransfer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
      ],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: '_tokenIds',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256',
          name: 'verifyNumberOfTokens',
          type: 'uint256',
        },
      ],
      name: 'burnClaim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'exists',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getOwner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'receivers',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'quantities',
          type: 'uint256[]',
        },
      ],
      name: 'gift',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes[]',
          name: 'data',
          type: 'bytes[]',
        },
        {
          internalType: 'address',
          name: 'diamond',
          type: 'address',
        },
      ],
      name: 'multicall',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nextTokenId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getPublicPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'numberMinted',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256[]',
          name: '_tokenIds',
          type: 'uint256[]',
        },
      ],
      name: 'revealIndividualTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'batchSize',
          type: 'uint256',
        },
      ],
      name: 'revealTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '_data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_setURI',
          type: 'string',
        },
      ],
      name: 'setIndividualTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'setTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalMinted',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
  bytecode:
    '0x608060405260043610610207575f3560e01c806375794a3c11610117578063b88d4fde1161009f578063dc33e6811161006e578063dc33e68114610680578063e985e9c51461069f578063f9fcccb4146106be578063fa825efd146106dd578063fd689f46146106fc5761023a565b8063b88d4fde14610610578063bff2612614610623578063c87b56dd14610642578063ce40ad86146106615761023a565b8063893d20e8116100e6578063893d20e81461056e57806395d89b41146105aa578063a22cb465146105be578063a2309ff8146105dd578063b80f55c9146105f15761023a565b806375794a3c146105085780637705f9b51461051c57806377b2f5b11461053b5780638456cb591461055a5761023a565b80633f4ba83a1161019a5780635c975abb116101695780635c975abb146104555780636352211e146104785780636c0360eb1461049757806370a08231146104ab5780637260a6bc146104ca5761023a565b80633f4ba83a146103fc57806340c10f191461041057806342842e0e146104235780634f558e79146104365761023a565b806318160ddd116101d657806318160ddd146103945780631ee6a15c146103b657806323b872dd146103d55780633ccfd60b146103e85761023a565b806301ffc9a7146102f557806306fdde0314610329578063081812fc1461034a578063095ea7b3146103815761023a565b3661023a57604051349033907f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f88525874905f90a3005b5f80356001600160e01b03191681527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131d60205260409020547fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c90819060601c806102d55760405162461bcd60e51b81526020600482015260076024820152664e4f5f46554e4360c81b60448201526064015b60405180910390fd5b365f80375f80365f845af43d5f803e8080156102ef573d5ff35b3d5ffd5b005b348015610300575f80fd5b5061031461030f366004613021565b61071b565b60405190151581526020015b60405180910390f35b348015610334575f80fd5b5061033d61076c565b6040516103209190613089565b348015610355575f80fd5b5061036961036436600461309b565b610805565b6040516001600160a01b039091168152602001610320565b6102f361038f3660046130d1565b610850565b34801561039f575f80fd5b506103a8610860565b604051908152602001610320565b3480156103c1575f80fd5b506102f36103d03660046131b1565b61087f565b6102f36103e33660046131f4565b610a24565b3480156103f3575f80fd5b506102f3610bfb565b348015610407575f80fd5b506102f3610d27565b6102f361041e3660046130d1565b610d5f565b6102f36104313660046131f4565b611068565b348015610441575f80fd5b5061031461045036600461309b565b611087565b348015610460575f80fd5b505f80516020613aa78339815191525460ff16610314565b348015610483575f80fd5b5061036961049236600461309b565b6110a4565b3480156104a2575f80fd5b5061033d6110ae565b3480156104b6575f80fd5b506103a86104c5366004613232565b6110bd565b3480156104d5575f80fd5b506104e96104e436600461324d565b611122565b6040805192151583526001600160a01b03909116602083015201610320565b348015610513575f80fd5b506103a8611295565b348015610527575f80fd5b506102f36105363660046132c3565b61129e565b348015610546575f80fd5b506102f3610555366004613329565b611432565b348015610565575f80fd5b506102f3611511565b348015610579575f80fd5b507fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1321546001600160a01b0316610369565b3480156105b5575f80fd5b5061033d61152b565b3480156105c9575f80fd5b506102f36105d836600461337b565b611543565b3480156105e8575f80fd5b506103a86115bf565b3480156105fc575f80fd5b506102f361060b3660046133b6565b6115c8565b6102f361061e3660046133f4565b61167b565b34801561062e575f80fd5b506102f361063d36600461309b565b6116bf565b34801561064d575f80fd5b5061033d61065c36600461309b565b6116d3565b34801561066c575f80fd5b506102f361067b36600461346e565b611944565b34801561068b575f80fd5b506103a861069a366004613232565b611cbf565b3480156106aa575f80fd5b506103146106b9366004613520565b611cc9565b3480156106c9575f80fd5b506102f36106d83660046133b6565b611d04565b3480156106e8575f80fd5b506102f36106f736600461309b565b611e64565b348015610707575f80fd5b506102f361071636600461354c565b612089565b5f6301ffc9a760e01b6001600160e01b03198316148061074b57506380ac58cd60e01b6001600160e01b03198316145b806107665750635b5e139f60e01b6001600160e01b03198316145b92915050565b606061077661239c565b600201805461078490613593565b80601f01602080910402602001604051908101604052809291908181526020018280546107b090613593565b80156107fb5780601f106107d2576101008083540402835291602001916107fb565b820191905f5260205f20905b8154815290600101906020018083116107de57829003601f168201915b5050505050905090565b5f61080f826123c0565b61082c576040516333d1c03960e21b815260040160405180910390fd5b61083461239c565b5f9283526006016020525060409020546001600160a01b031690565b61085c82826001612407565b5050565b5f600161086b61239c565b6001015461087761239c565b540303919050565b6108876124ba565b5f610890612541565b60018101549091505f80516020613a4783398151915290600160a01b900460ff16156108fe5760405162461bcd60e51b815260206004820152601e60248201527f417065466174686572733a206d657461646174612069732066726f7a656e000060448201526064016102cc565b610907846123c0565b6109535760405162461bcd60e51b815260206004820181905260248201527f417065466174686572733a20746f6b656e20646f6573206e6f7420657869737460448201526064016102cc565b825160609015610993578361096786612565565b8460440160405160200161097d9392919061363a565b6040516020818303038152906040529050610a03565b5f83603e0180546109a390613593565b905011156109ce5782603e016109b886612565565b8460440160405160200161097d93929190613676565b826043016109db86612565565b846044016040516020016109f193929190613676565b60405160208183030381529060405290505b5f8581526009830160205260409020610a1c82826136d6565b505050505050565b5f610a2e826125a8565b9050836001600160a01b0316816001600160a01b031614610a615760405162a1148160e81b815260040160405180910390fd5b5f80610a6c84612650565b91509150610a918187610a7c3390565b6001600160a01b039081169116811491141790565b610abc57610a9f8633611cc9565b610abc57604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b038516610ae357604051633a954ecd60e21b815260040160405180910390fd5b8015610aed575f82555b610af561239c565b6001600160a01b0387165f9081526005919091016020526040902080545f19019055610b1f61239c565b6001600160a01b0386165f8181526005929092016020526040909120805460010190554260a01b17600160e11b17610b5561239c565b5f8681526004919091016020526040812091909155600160e11b84169003610bc85760018401610b8361239c565b5f82815260049190910160205260408120549003610bc657610ba361239c565b548114610bc65783610bb361239c565b5f83815260049190910160205260409020555b505b83856001600160a01b0316876001600160a01b03165f80516020613a8783398151915260405160405180910390a4610a1c565b610c03612675565b610c0b6124ba565b5f4711610c455760405162461bcd60e51b81526020600482015260086024820152674e4f5f46554e445360c01b60448201526064016102cc565b5f610c4e612541565b9050475f5b607a830154811015610d0c5782607a018181548110610c7457610c74613791565b5f91825260209091200154600b840180546001600160a01b03909216916108fc916127109185908110610ca957610ca9613791565b5f9182526020909120601082040154610cd291600f166002026101000a900461ffff16866137b9565b610cdc91906137d0565b6040518115909202915f818181858888f19350505050610cfa575f80fd5b80610d04816137ef565b915050610c53565b505050610d2560015f80516020613a2783398151915255565b565b610d2f6124ba565b610d376126e6565b5f610d40612541565b6001018054911515600160781b0260ff60781b19909216919091179055565b610d67612675565b33610da85760405162461bcd60e51b81526020600482015260116024820152704d696e74546f5a65726f4164647265737360781b60448201526064016102cc565b333214610df75760405162461bcd60e51b815260206004820181905260248201527f5245564552543a2055736520612064697265637420454f4120746f206d696e7460448201526064016102cc565b5f8111610e395760405162461bcd60e51b815260206004820152601060248201526f4d696e745a65726f5175616e7469747960801b60448201526064016102cc565b610e41612541565b5460ff16811115610e945760405162461bcd60e51b815260206004820152601960248201527f4d41585f4d494e54535f5045525f54585f45584345454445440000000000000060448201526064016102cc565b610e9c612541565b600190810154600160881b900460ff161515148015610ed75750610ebe612541565b600a0154610eca612744565b610ed49083613807565b11155b15610fb65780610ee5612541565b60060154610ef391906137b9565b341015610f3b5760405162461bcd60e51b8152602060048201526016602482015275125b9cdd59999a58da595b9d119d5b991cd7db5a5b9d60521b60448201526064016102cc565b610f458282612753565b604051819033907f30385c845b448a36257a6a1716e6ad2e1bc2cbe333cde1e69fe849ad6511adfe905f90a3610f79612541565b600a0154610f85612744565b10610fb1575f610f93612541565b6001018054911515600160881b0260ff60881b199092169190911790555b611052565b610fa0610fc1610860565b10611017575f610fcf612541565b6001018054911515600160881b0260ff60881b199092169190911790555f610ff5612541565b6001018054911515600160901b0260ff60901b19909216919091179055611052565b60405162461bcd60e51b815260206004820152601060248201526f4d696e744e6f74417661696c61626c6560801b60448201526064016102cc565b61085c60015f80516020613a2783398151915255565b61108283838360405180602001604052805f81525061167b565b505050565b5f611091826123c0565b61109c57505f919050565b506001919050565b5f610766826125a8565b60606110b861276c565b905090565b5f6001600160a01b0382166110e5576040516323d3ad8160e21b815260040160405180910390fd5b6001600160401b036110f561239c565b6005015f846001600160a01b03166001600160a01b031681526020019081526020015f2054169050919050565b5f8061112c6124ba565b6001600160a01b0384166111705760405162461bcd60e51b815260206004820152600b60248201526a1393d517d0531313d5d15160aa1b60448201526064016102cc565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1321546001600160a01b03163314806111b057506001600160a01b03841615155b156112055760016001600160a01b0385167f38e687ac324ce734beae61556c4ab307885ce0b6f601e29a52a5751786b413da33866040516111f292919061381a565b60405180910390a350600190508261128e565b5f6001600160a01b0385167fbd86a3e4dd11daa0c80f50f186ed40fd2b34f7521bf08ffc87a3766a361ef3fe3361123a612541565b60450160405161124b92919061383d565b60405180910390a360405162461bcd60e51b815260206004820152601060248201526f155411d490511157d491529150d5115160821b60448201526064016102cc565b9250929050565b5f6110b8612744565b6112a6612675565b6112ae6124ba565b8281146113125760405162461bcd60e51b815260206004820152602c60248201527f5245434549564552535f414e445f5155414e5449544945535f4d5553545f424560448201526b0bea6829a8abe988a9c8ea8960a31b60648201526084016102cc565b5f805b828110156113555783838281811061132f5761132f613791565b90506020020135826113419190613807565b91508061134d816137ef565b915050611315565b50610fa081611362610860565b61136c9190613807565b11156113b05760405162461bcd60e51b815260206004820152601360248201527213505617d4d55414131657d15610d151511151606a1b60448201526064016102cc565b5f5b84811015611414576114028686838181106113cf576113cf613791565b90506020020160208101906113e49190613232565b8585848181106113f6576113f6613791565b90506020020135612753565b8061140c816137ef565b9150506113b2565b505061142c60015f80516020613a2783398151915255565b50505050565b6001600160a01b038116156114475780611449565b305b9050816114825760405162461bcd60e51b81526020600482015260076024820152664e4f5f4441544160c81b60448201526064016102cc565b5f5b8281101561142c575f84848381811061149f5761149f613791565b90506020028101906114b191906138d2565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92018290525084519495509384935091505060208401865af4806114fc575f80fd5b50508080611509906137ef565b915050611484565b6115196124ba565b6115216127b4565b6001610d40612541565b606061153561239c565b600301805461078490613593565b8061154c61239c565b335f818152600792909201602090815260408084206001600160a01b03881680865290835293819020805460ff19169515159590951790945592518415158152919290917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b5f6110b86127fc565b6115d0612675565b6115d8612541565b60010154600160701b900460ff166116275760405162461bcd60e51b8152602060048201526012602482015271546f6b656e4275726e4e6f7441637469766560701b60448201526064016102cc565b5f5b818110156116645761165283838381811061164657611646613791565b9050602002013561280e565b8061165c816137ef565b915050611629565b5061085c60015f80516020613a2783398151915255565b611686848484610a24565b6001600160a01b0383163b1561142c576116a284848484612846565b61142c576040516368d2bf6b60e11b815260040160405180910390fd5b6116c76124ba565b6116d08161292d565b50565b60605f6116de612541565b5f8481525f80516020613a6783398151915260205260409020549091505f80516020613a478339815191529060ff16158015611720575061171e846123c0565b155b1561176d5760405162461bcd60e51b815260206004820152601b60248201527f5552495175657279466f724e6f6e6578697374656e74546f6b656e000000000060448201526064016102cc565b6001820154600160b01b900460ff16611846575f84815260018201602052604090205460ff1615611837575f848152600982016020526040902080546117b290613593565b80601f01602080910402602001604051908101604052809291908181526020018280546117de90613593565b80156118295780601f1061180057610100808354040283529160200191611829565b820191905f5260205f20905b81548152906001019060200180831161180c57829003601f168201915b505050505092505050919050565b8160400180546117b290613593565b5f84815260018201602052604090205460ff1615611878575f848152600982016020526040902080546117b290613593565b5f8481526009820160205260409020805461189290613593565b90505f0361192a5760605f83603e0180546118ac90613593565b905011156118ed5782603e016118c186612565565b846044016040516020016118d793929190613676565b6040516020818303038152906040529050611922565b826043016118fa86612565565b8460440160405160200161191093929190613676565b60405160208183030381529060405290505b949350505050565b5f848152600982016020526040902080546117b290613593565b61194c612675565b8151600281101561199f5760405162461bcd60e51b815260206004820152601b60248201527f4d7573742070726f76696465206174206c65617374203220494473000000000060448201526064016102cc565b6001600160a01b0382166119f55760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f742073656e6420746f20302061646472657373000000000000000060448201526064016102cc565b336001600160a01b03831603611a435760405162461bcd60e51b815260206004820152601360248201527221b0b73737ba1039b2b732103a379039b2b63360691b60448201526064016102cc565b5f5b81811015611b6a57611a6f848281518110611a6257611a62613791565b60200260200101516123c0565b611ab25760405162461bcd60e51b8152602060048201526014602482015273151bdad95b88191bd95cc81b9bdd08195e1a5cdd60621b60448201526064016102cc565b611ad4848281518110611ac757611ac7613791565b60200260200101516110a4565b6001600160a01b0316336001600160a01b03161480611b0c5750611b0c611b06858381518110611ac757611ac7613791565b33611cc9565b611b585760405162461bcd60e51b815260206004820152601860248201527f43616c6c65724e6f744f776e65726f72417070726f766564000000000000000060448201526064016102cc565b80611b62816137ef565b915050611a45565b505f5b81811015611ca7575f611b7e612541565b54611b8c9060ff1683613807565b905082811115611b995750815b5f611ba48383613914565b6001600160401b03811115611bbb57611bbb6130fb565b604051908082528060200260200182016040528015611be4578160200160208202803683370190505b509050825b82811015611c4557868181518110611c0357611c03613791565b6020026020010151828583611c189190613914565b81518110611c2857611c28613791565b602090810291909101015280611c3d816137ef565b915050611be9565b505f5b8151811015611c8757611c753387848481518110611c6857611c68613791565b6020026020010151611068565b80611c7f816137ef565b915050611c48565b50611c90612541565b54611c9e9060ff1684613807565b92505050611b6d565b505061085c60015f80516020613a2783398151915255565b5f61076682612ae5565b5f611cd261239c565b6001600160a01b039384165f908152600791909101602090815260408083209490951682529290925250205460ff1690565b611d0c6124ba565b5f611d15612541565b90508180611d585760405162461bcd60e51b815260206004820152601060248201526f139bd51bdad95b9cd51bd4995d99585b60821b60448201526064016102cc565b5f816001600160401b03811115611d7157611d716130fb565b604051908082528060200260200182016040528015611d9a578160200160208202803683370190505b5090505f805b83811015611e30575f878783818110611dbb57611dbb613791565b905060200201359050611dd85f80516020613a4783398151915290565b5f828152600191909101602052604090205460ff16611e1d5780848481518110611e0457611e04613791565b602090810291909101015282611e19816137ef565b9350505b5080611e28816137ef565b915050611da0565b508015610a1c57611e418282612b27565b80846008015f828254611e549190613807565b90915550610a1c90508282612bb9565b611e6c6124ba565b5f611e75612541565b90505f6005831015611f0f57611f088260070154611f0384600801546001611e9d9190613807565b306001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611ed9573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611efd9190613927565b90612c42565b612c54565b9050611f2a565b611f2783611f0384600801546001611e9d9190613807565b90505b5f8111611f685760405162461bcd60e51b815260206004820152600c60248201526b4d6f72655468616e5a45524f60a01b60448201526064016102cc565b5f816001600160401b03811115611f8157611f816130fb565b604051908082528060200260200182016040528015611faa578160200160208202803683370190505b5060088401549091505f9081611fc56001611efd8488612c69565b9050610fa08110611fee575060018501805462ff00ff60b01b19166201000160b01b179055610fa05b815b818111612056575f8181525f80516020613a67833981519152602052604090205460ff16612044578085858151811061202b5761202b613791565b602090810291909101015283612040816137ef565b9450505b8061204e816137ef565b915050611ff0565b508215612080576120678484612b27565b82866008015f82825461207a9190613807565b90915550505b50505050505050565b5f612092612541565b90508282146120b45760405163545facaf60e01b815260040160405180910390fd5b6001810154600160901b900460ff166120e05760405163d88a651b60e01b815260040160405180910390fd5b600183101561210257604051633b4f091f60e21b815260040160405180910390fd5b5f5b8381101561234e575f85858381811061211f5761211f613791565b9050602002013560405160240161213891815260200190565b60408051601f198184030181529181526020820180516001600160e01b03166331a9108f60e11b17905260ad85015490519192505f9182916001600160a01b03169061218590859061393e565b5f60405180830381855afa9150503d805f81146121bd576040519150601f19603f3d011682016040523d82523d5f602084013e6121c2565b606091505b5091509150816121e757604051637f5a8af360e11b81523360048201526024016102cc565b5f818060200190518101906121fc9190613959565b90506001600160a01b03811633146122435788888681811061222057612220613791565b90506020020135604051632717712b60e01b81526004016102cc91815260200190565b5f89898781811061225657612256613791565b9050602002013560405160240161226f91815260200190565b60408051601f198184030181529181526020820180516001600160e01b0316630852cd8d60e31b17905260ad89015490519192506001600160a01b0316906122b890839061393e565b5f604051808303815f865af19150503d805f81146122f1576040519150601f19603f3d011682016040523d82523d5f602084013e6122f6565b606091505b505080945050836123365789898781811061231357612313613791565b9050602002013560405163273da76d60e21b81526004016102cc91815260200190565b50505050508080612346906137ef565b915050612104565b506123593384612753565b7f6a7d942009476991cd9b5ceb77ad3ffcadfeb9947256883132d08cd5724fb39f3360405161238e9190869088908290613974565b60405180910390a150505050565b7f2569078dfb4b0305704d3008e7403993ae9601b85f7ae5e742de3de8f8011c4090565b5f816001111580156123d957506123d561239c565b5482105b80156107665750600160e01b6123ed61239c565b5f8481526004919091016020526040902054161592915050565b5f612411836110a4565b9050811561245057336001600160a01b03821614612450576124338133611cc9565b612450576040516367d9dca160e11b815260040160405180910390fd5b8361245961239c565b5f858152600691909101602052604080822080546001600160a01b0319166001600160a01b0394851617905551859287811692908516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a450505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600501546001600160a01b03163314610d255760405162461bcd60e51b815260206004820152602260248201527f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60448201526132b960f11b60648201526084016102cc565b7fcecd292e5571d7e34e3bf4383cbd2be4a5ee7004857e5c293170484b74aec0f990565b606060a06040510180604052602081039150505f815280825b600183039250600a81066030018353600a90048061257e5750819003601f19909101908152919050565b5f81600111612637576125b961239c565b5f83815260049190910160205260408120549150600160e01b8216900361263757805f03612632576125e961239c565b54821061260957604051636f96cda160e11b815260040160405180910390fd5b61261161239c565b5f199092015f81815260049390930160205260409092205490508015612609575b919050565b604051636f96cda160e11b815260040160405180910390fd5b5f805f61265b61239c565b5f9485526006016020525050604090912080549092909150565b60025f80516020613a2783398151915254036126d35760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102cc565b60025f80516020613a2783398151915255565b6126ee612c74565b5f80516020613aa7833981519152805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b5f61274d61239c565b54919050565b61085c828260405180602001604052805f815250612cc9565b60605f612777612541565b603e01805461278590613593565b90501161279e575060408051602081019091525f815290565b6127a6612541565b603e01805461078490613593565b6127bc612d3c565b5f80516020613aa7833981519152805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25833612727565b5f600161280761239c565b5403919050565b61281781612d8e565b604051819033907f696de425f79f4a40bc6d2122ca50507f0efbeabbff86a84871b7196ab8ea8df7905f90a350565b604051630a85bd0160e11b81525f906001600160a01b0385169063150b7a029061287a9033908990889088906004016139c4565b6020604051808303815f875af19250505080156128b4575060408051601f3d908101601f191682019092526128b191810190613a00565b60015b612910573d8080156128e1576040519150601f19603f3d011682016040523d82523d5f602084013e6128e6565b606091505b5080515f03612908576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050949350505050565b5f612936612541565b9050612941826123c0565b6129a35760405162461bcd60e51b815260206004820152602d60248201527f4c69624469616d6f6e6444617065733a2055524920736574206f66206e6f6e6560448201526c3c34b9ba32b73a103a37b5b2b760991b60648201526084016102cc565b5f81603e016040516129b59190613a1b565b60408051918290038220602083019091525f90915290507fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4707f3a2db9fe7908dcc36d81824d2338fc3f1aff49ac357dd8c4840527fba27a5b908201612a7c5782604301612a2185612565565b84604401604051602001612a3793929190613676565b604051602081830303815290604052612a5a5f80516020613a4783398151915290565b5f8681526009919091016020526040902090612a7690826136d6565b5061142c565b82603e01612a8985612565565b84604401604051602001612a9f93929190613676565b604051602081830303815290604052612ac25f80516020613a4783398151915290565b5f8681526009919091016020526040902090612ade90826136d6565b5050505050565b5f6001600160401b036040612af861239c565b6005015f856001600160a01b03166001600160a01b031681526020019081526020015f2054901c169050919050565b5f80516020613a478339815191525f80516020613a678339815191525f5b83811015612ade575f858281518110612b6057612b60613791565b6020908102919091018101515f8181529185905260409091205490915060ff16612ba657612b8d8161292d565b5f818152602084905260409020805460ff191660011790555b5080612bb1816137ef565b915050612b45565b5f80516020613a478339815191525f80516020613a678339815191525f5b83811015612ade575f858281518110612bf257612bf2613791565b6020908102919091018101515f8181529185905260409091205490915060ff16612c2f575f818152602084905260409020805460ff191660011790555b5080612c3a816137ef565b915050612bd7565b5f612c4d8284613914565b9392505050565b5f818310612c625781612c4d565b5090919050565b5f612c4d8284613807565b5f80516020613aa78339815191525460ff16610d255760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016102cc565b612cd38383612d98565b6001600160a01b0383163b15611082575f612cec61239c565b5490508281035b612d055f868380600101945086612846565b612d22576040516368d2bf6b60e11b815260040160405180910390fd5b818110612cf35781612d3261239c565b5414612ade575f80fd5b5f80516020613aa78339815191525460ff1615610d255760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016102cc565b6116d0815f612ea6565b5f612da161239c565b5490505f829003612dc55760405163b562e8dd60e01b815260040160405180910390fd5b680100000000000000018202612dd961239c565b6001600160a01b0385165f81815260059290920160205260409091208054929092019091554260a01b6001841460e11b1717612e1361239c565b5f83815260049190910160205260408120919091556001600160a01b0384169083830190839083905f80516020613a878339815191528180a4600183015b818114612e745780835f5f80516020613a878339815191525f80a4600101612e51565b50815f03612e9457604051622e076360e81b815260040160405180910390fd5b80612e9d61239c565b55506110829050565b5f612eb0836125a8565b9050805f80612ebe86612650565b915091508415612efe57612ed3818433610a7c565b612efe57612ee18333611cc9565b612efe57604051632ce44b5f60e11b815260040160405180910390fd5b8015612f08575f82555b6fffffffffffffffffffffffffffffffff612f2161239c565b6001600160a01b0385165f81815260059290920160205260409091208054929092019091554260a01b17600360e01b17612f5961239c565b5f8881526004919091016020526040812091909155600160e11b85169003612fcc5760018601612f8761239c565b5f82815260049190910160205260408120549003612fca57612fa761239c565b548114612fca5784612fb761239c565b5f83815260049190910160205260409020555b505b60405186905f906001600160a01b038616905f80516020613a87833981519152908390a4612ff861239c565b600190810180549091019055505050505050565b6001600160e01b0319811681146116d0575f80fd5b5f60208284031215613031575f80fd5b8135612c4d8161300c565b5f5b8381101561305657818101518382015260200161303e565b50505f910152565b5f815180845261307581602086016020860161303c565b601f01601f19169290920160200192915050565b602081525f612c4d602083018461305e565b5f602082840312156130ab575f80fd5b5035919050565b6001600160a01b03811681146116d0575f80fd5b8035612632816130b2565b5f80604083850312156130e2575f80fd5b82356130ed816130b2565b946020939093013593505050565b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b0381118282101715613137576131376130fb565b604052919050565b5f6001600160401b03831115613157576131576130fb565b61316a601f8401601f191660200161310f565b905082815283838301111561317d575f80fd5b828260208301375f602084830101529392505050565b5f82601f8301126131a2575f80fd5b612c4d8383356020850161313f565b5f80604083850312156131c2575f80fd5b8235915060208301356001600160401b038111156131de575f80fd5b6131ea85828601613193565b9150509250929050565b5f805f60608486031215613206575f80fd5b8335613211816130b2565b92506020840135613221816130b2565b929592945050506040919091013590565b5f60208284031215613242575f80fd5b8135612c4d816130b2565b5f806040838503121561325e575f80fd5b8235613269816130b2565b915060208301356001600160401b038111156131de575f80fd5b5f8083601f840112613293575f80fd5b5081356001600160401b038111156132a9575f80fd5b6020830191508360208260051b850101111561128e575f80fd5b5f805f80604085870312156132d6575f80fd5b84356001600160401b03808211156132ec575f80fd5b6132f888838901613283565b90965094506020870135915080821115613310575f80fd5b5061331d87828801613283565b95989497509550505050565b5f805f6040848603121561333b575f80fd5b83356001600160401b03811115613350575f80fd5b61335c86828701613283565b9094509250506020840135613370816130b2565b809150509250925092565b5f806040838503121561338c575f80fd5b8235613397816130b2565b9150602083013580151581146133ab575f80fd5b809150509250929050565b5f80602083850312156133c7575f80fd5b82356001600160401b038111156133dc575f80fd5b6133e885828601613283565b90969095509350505050565b5f805f8060808587031215613407575f80fd5b8435613412816130b2565b93506020850135613422816130b2565b92506040850135915060608501356001600160401b03811115613443575f80fd5b8501601f81018713613453575f80fd5b6134628782356020840161313f565b91505092959194509250565b5f806040838503121561347f575f80fd5b82356001600160401b0380821115613495575f80fd5b818501915085601f8301126134a8575f80fd5b81356020828211156134bc576134bc6130fb565b8160051b92506134cd81840161310f565b82815292840181019281810190898511156134e6575f80fd5b948201945b84861015613504578535825294820194908201906134eb565b965061351390508782016130c6565b9450505050509250929050565b5f8060408385031215613531575f80fd5b823561353c816130b2565b915060208301356133ab816130b2565b5f805f6040848603121561355e575f80fd5b83356001600160401b03811115613573575f80fd5b61357f86828701613283565b909790965060209590950135949350505050565b600181811c908216806135a757607f821691505b6020821081036135c557634e487b7160e01b5f52602260045260245ffd5b50919050565b5f81546135d781613593565b600182811680156135ef576001811461360457613630565b60ff1984168752821515830287019450613630565b855f526020805f205f5b858110156136275781548a82015290840190820161360e565b50505082870194505b5050505092915050565b5f845161364b81846020890161303c565b84519083019061365f81836020890161303c565b61366b818301866135cb565b979650505050505050565b5f61368182866135cb565b845161365f81836020890161303c565b601f821115611082575f81815260208120601f850160051c810160208610156136b75750805b601f850160051c820191505b81811015610a1c578281556001016136c3565b81516001600160401b038111156136ef576136ef6130fb565b613703816136fd8454613593565b84613691565b602080601f831160018114613736575f841561371f5750858301515b5f19600386901b1c1916600185901b178555610a1c565b5f85815260208120601f198616915b8281101561376457888601518255948401946001909101908401613745565b508582101561378157878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b8082028115828204841417610766576107666137a5565b5f826137ea57634e487b7160e01b5f52601260045260245ffd5b500490565b5f60018201613800576138006137a5565b5060010190565b80820180821115610766576107666137a5565b6001600160a01b03831681526040602082018190525f906119229083018461305e565b60018060a01b03831681525f60206040818401525f845461385d81613593565b806040870152606060018084165f811461387e5760018114613898576138c3565b60ff1985168984015283151560051b8901830195506138c3565b895f52865f205f5b858110156138bb5781548b82018601529083019088016138a0565b8a0184019650505b50939998505050505050505050565b5f808335601e198436030181126138e7575f80fd5b8301803591506001600160401b03821115613900575f80fd5b60200191503681900382131561128e575f80fd5b81810381811115610766576107666137a5565b5f60208284031215613937575f80fd5b5051919050565b5f825161394f81846020870161303c565b9190910192915050565b5f60208284031215613969575f80fd5b8151612c4d816130b2565b6001600160a01b03851681526020810184905260606040820181905281018290525f6001600160fb1b038311156139a9575f80fd5b8260051b808560808501379190910160800195945050505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f906139f69083018461305e565b9695505050505050565b5f60208284031215613a10575f80fd5b8151612c4d8161300c565b5f612c4d82846135cb56fe85e1ca0cb738650ceae09b8e7a40cba718d04131dd54b748289da0a916d2f321964c6c086226a49ba620da6f11233936184f95f05b1ea9e51fafe9a322337c32964c6c086226a49ba620da6f11233936184f95f05b1ea9e51fafe9a322337c33ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef7a6a842f4b254b253ecba70474976063c6e762839bf3f5aef2536e9bee8f5e65a2646970667358221220ba5b19de1e1ba16bb5ba27c9d81fc65cd36620423d6cb2a84757e3a66582bb8f64736f6c63430008150033',
} as const;
