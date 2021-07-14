let mainTokenSymbol = 'KCS';
let explorerUrl = 'https://explorer.kcc.io/en/tx/';

let deployerAddress = '0x3342EEBe3af0DF05F2bba628B53CF0C4A1a24F40';

let tokens = [
    {
        'symbol' : 'KCS',
        'decimals' : 18,
        'is_main' : true,
        'address' : false,
        'pair' : false
    },
    {
        'symbol' : 'LAMBO',
        'decimals' : 9,
        'is_main' : false,
        'address' : '0x041a33502ba2ab0d73f400564cfaa696b2ac8b64',
        'pair' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'
    },
    {
        'symbol' : 'LAMBO-LP',
        'decimals' : 18,
        'is_main' : false,
        'is_lp' : true,
        'address' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9',
        'pair' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'
    },
    {
        'symbol' : 'KANDY',
        'decimals' : 18,
        'is_main' : false,
        'address' : '0x1aaaf8d0588a14f54ed3624f96205989df091181',
        'pair' : '0x07eee6090d66b3b290857ac88577a49f49ac8586'
    },
    {
        'symbol' : 'KUDOS',
        'decimals' : 8,
        'is_main' : false,
        'address' : '0x1b465775469c71b898bb51b53b2d4464b7cd3448',
        'pair' : '0x4168c7969a2cba346b24a67fa92c60391ac8bab4'
    },
    {
        'symbol' : 'SAFEMOON',
        'decimals' : 9,
        'is_main' : false,
        'address' : '0x4abc52243fa1e7bfa3102cb89739f2c3d435bf85',
        'pair' : '0xa38a2db97a2e122ceb749375837f112a2cc39949'
    },
    {
        'symbol' : 'KOFFEE',
        'decimals' : 18,
        'is_main' : false,
        'address' : '0xc0ffee0000921eb8dd7d506d4de8d5b79b856157',
        'pair' : '0xe95c9f40f3bffa2ade0fc274ef97b8e1138b2eff'
    },
    {
        'symbol' : 'KUS',
        'decimals' : 18,
        'is_main' : false,
        'address' : '0x4a81704d8c16d9fb0d7f61b747d0b5a272badf14',
        'pair' : '0x1ee6b0f7302b3c48c5fa89cd0a066309d9ac3584'
    },
    {
        'symbol' : 'KUDOGE',
        'decimals' : 18,
        'is_main' : false,
        'address' : '0x6665d66afa48f527d86623723342cfa258cb8666',
        'pair' : '0xd60acab9c0337e4fc257aeadaca69ac744fa2a5f'
    },
    {
        'symbol' : 'KUSHIB',
        'decimals' : 9,
        'is_main' : false,
        'address' : '0x7d6d0aa59fcab13140604dc122bf310bd72c00a1',
        'pair' : '0x4e8708617c4dd9929adcc6da8970ced2d712e409'
    }
];

let pools = [
    {
        'stakingToken' : 'KCS',
        'rewardToken' : 'LAMBO',
        'address' : '0x581f9182FD3817f15a899e9B3C9668E658BCCCAD',
        'type' : 'StakingPoolBaseRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'
    },
    {
        'stakingToken' : 'LAMBO',
        'rewardToken' : 'LAMBO',
        'address' : '0x69e8fc0ABCa332A32B0e4e2e85A90527646f3d5e',
        'type' : 'StakingPoolBaseRewarded',
        'enabled' : true,
        'apyEnabled' : true
    },
    {
        'stakingToken' : 'LAMBO-LP',
        'rewardToken' : 'LAMBO',
        'address' : '0xf588d38c985bfd8606fef1d5b2d6f08298d6c3de',
        'type' : 'StakingPoolBaseRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'
    },
    {
        'stakingToken' : 'KANDY',
        'rewardToken' : 'LAMBO',
        'address' : '0x132989466CfC5091d9733872CC80427Cf5A42fBa',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair' : '0x07eee6090d66b3b290857ac88577a49f49ac8586'
    },
    {
        'stakingToken' : 'KUDOS',
        'rewardToken' : 'LAMBO',
        'address' : '0x5d3Af94e063132eC363f7EA1160f8263890d8cA1',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair' : '0x4168c7969a2cba346b24a67fa92c60391ac8bab4'
    },
    {
        'stakingToken' : 'SAFEMOON',
        'rewardToken' : 'LAMBO',
        'address' : '0x2c2e25f9dbD879cCcfeb8fb99C367bd13071c1b7',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair':'0xa38a2db97a2e122ceb749375837f112a2cc39949'
    },
    {
        'stakingToken' : 'KOFFEE',
        'rewardToken' : 'LAMBO',
        'address' : '0x21163A9457A071075304fe2D9Db44AdEEc1A9DB2',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair' : '0xe95c9f40f3bffa2ade0fc274ef97b8e1138b2eff'
    },
    {
        'stakingToken' : 'KUS',
        'rewardToken' : 'LAMBO',
        'address' : '0x8CA8F044bEB83618d3139675F4Eb78c57486437D',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'switched' : true,
        'pair':'0x1ee6b0f7302b3c48c5fa89cd0a066309d9ac3584'
    },
    {
        'stakingToken' : 'KUDOGE',
        'rewardToken' : 'LAMBO',
        'address' : '0x7214E2262d6346d266a918422D7BAe83424ed2b6',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'pair':'0xd60acab9c0337e4fc257aeadaca69ac744fa2a5f'
    },
    {
        'stakingToken' : 'KUSHIB',
        'rewardToken' : 'LAMBO',
        'address' : '0xbcad4bcd3cee73575b2c84d6864079f62663535f',
        'type' : 'StakingPoolTokenRewarded',
        'enabled' : true,
        'apyEnabled' : true,
        'switched' : true,
        'pair' : '0x4e8708617c4dd9929adcc6da8970ced2d712e409'
    }
];

let pairs = [
    {
        'token0' : 'LAMBO',
        'token1' : 'KCS',
        'address' : '0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'
    },
    {
        'token0' : 'KANDY',
        'token1' : 'KCS',
        'address' : '0x07eee6090d66b3b290857ac88577a49f49ac8586'
    },
    {
        'token0' : 'KUDOS',
        'token1' : 'KCS',
        'address' : '0x4168c7969a2cba346b24a67fa92c60391ac8bab4'
    },
    {
        'token0' : 'SAFEMOON',
        'token1' : 'KCS',
        'address' : '0xa38a2db97a2e122ceb749375837f112a2cc39949',
        'is_switched' : true
    },
    {
        'token0' : 'KOFFEE',
        'token1' : 'KCS',
        'address' : '0xe95c9f40f3bffa2ade0fc274ef97b8e1138b2eff',
        'is_switched' : true
    },
    {
        'token0' : 'KUS',
        'token1' : 'KCS',
        'address' : '0x1ee6b0f7302b3c48c5fa89cd0a066309d9ac3584',
        'is_switched' : true
    },
    {
        'token0' : 'KUDOGE',
        'token1' : 'KCS',
        'address' : '0xd60acab9c0337e4fc257aeadaca69ac744fa2a5f',
        'is_switched' : true
    },
    {
        'token0' : 'KUSHIB',
        'token1' : 'KCS',
        'address' : '0x4e8708617c4dd9929adcc6da8970ced2d712e409',
        'is_switched' : true
    }
];

let abiPool = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "earned",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "exit",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getReward",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "rewardRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "type": "function"
    }
];
let abiPoolMain = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "earned",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "exit",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getReward",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "rewardRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "type": "function"
    }
];
let abiERC20 = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    }
];
let abiUniswapPair = [
    {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            {"internalType":"uint112","name":"reserve0","type":"uint112"},
            {"internalType":"uint112","name":"reserve1","type":"uint112"},
            {"internalType":"uint32","name":"blockTimestampLast","type":"uint32"}
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
