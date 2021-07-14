var web3 = new Web3(Web3.givenProvider);
var account;

let mainTokenSymbol = 'KCS';
let explorerUrl = 'https://kovan.etherscan.io/tx/';

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
            {"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var contracts = [];
var userBalancesStakingTokens = [];
var userAllowedStakingTokens = [];
var userBalancesPools = [];
var userRewardsPools = [];
var totalBalancesPools = [];
var rewardRates = [];


const addPools = function() {
    $('#table--pools tbody tr').remove();
    for(var i = 0; i < pools.length; i++) {
        var pool = pools[i];
        var poolId = pool.stakingToken + '--' + pool.rewardToken;
        var disabled = !pool.enabled;
        var classes = "pool-row";
        if(disabled) {
            classes+= ' disabled';
        }
        var row = '<tr class="' + classes + '" data-pool="' + poolId + '">';
        row+= '<td>$'+pool.stakingToken+'</td>';
        row+= '<td>$'+pool.rewardToken+'</td>';
        row+= '<td><span class="display--apy">-</span></td>';
        row+= '<td><span class="display--total-staked">-</span></td>';
        row+= '<td><span class="display--user-staked">-</span><br><a href="#" class="btn--unstake">unstake</a></td>';
        row+= '<td><span class="display--user-reward">-</span><br><a href="#" class="btn--claim">claim</a></td>';
        row+= '<td><span class="display--user-balance">-</span><br><a href="#" class="btn--stake-max">stake max</a></td>';
        row+= '<td>';
        row+= '<form class="form staking-form"><div class="row">';
        if(!disabled) {
            row+= '<div class="col-md-6"><div class="form-group"><input type="text" class="form-control" name="amount" style="min-width:100px;"/></div></div>';
            row+= '<div class="col-md-6"><div class="form-group"><input type="submit" class="form-control" value="Stake" /></div></div>';
        } else {
            row+= '<div class="col-md-6"><div class="form-group"><input type="text" class="form-control" name="amount" style="min-width:100px;" disabled /></div></div>';
            row+= '<div class="col-md-6"><div class="form-group"><input type="submit" class="form-control" value="Disabled" disabled /></div></div>';
        }
        row+= '</div></form>';
        row+= '</td>';
        row+= '</tr>';
        $('#table--pools tbody').append(row);
    }
}

const connectWallet = async (callback) => {
    try {
        await window.ethereum.enable();
        window.web3.eth.getAccounts().then(e => {
            account = e[0];
            afterWalletConnect();
        });
    } catch (err) {
        console.log(err);
    }
}

const getTokenByAddress = function(address) {
    for(var i = 0; i < tokens.length; i++) {
        if(address == tokens[i].address) {
            return tokens[i];
        }
    }
    return false;
}

const getTokenBySymbol = function(symbol) {
    for(var i = 0; i < tokens.length; i++) {
        if(symbol == tokens[i].symbol) {
            return tokens[i];
        }
    }
    return false;
}

const getPoolId = function(pool) {
    return pool.stakingToken + '--' + pool.rewardToken;
}

const getPoolById = function(id) {
    for(var i = 0; i < pools.length;i++) {
        if(id == getPoolId(pools[i])) {
            return pools[i];
        }
    }
}

const createContracts = function() {
    for(var i = 0; i < tokens.length; i++) {
        if(tokens[i].address) {
            contracts[tokens[i].address] = new window.web3.eth.Contract(abiERC20, tokens[i].address);
        }
    }
    for(var i = 0; i < pools.length; i++) {
        if(pools[i].type == 'StakingPoolBaseRewarded') {
            contracts[pools[i].address] = new window.web3.eth.Contract(abiPoolMain, pools[i].address);
        } else {
            contracts[pools[i].address] = new window.web3.eth.Contract(abiPool, pools[i].address);
        }
    }
}

const message = function(poolId, message, txHash) {
    removeMessage();
    var td = '<td class="overlay">' + message;
    if(txHash) {
        td+= ' <a href="' + explorerUrl + txHash + '" target="_blank">View TX</a>';
    }
    td+= '</td>';
    $('tr[data-pool="' + poolId +'"]').append(td);
}

const removeMessage = function () {
    $('td.overlay').remove();
}


const fetchUserMainBalance = async() => {
    web3.eth.getBalance(account, function(error, result) {
        if(!error) {
            userBalancesStakingTokens[mainTokenSymbol] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserTokenBalance = async(address) => {
    if(!contracts[address]) {
        return false;
    }
    contracts[address].methods.balanceOf(account).call({from:account}, function (error, result) {
        if(!error) {
            userBalancesStakingTokens[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserTokenApproved = async(tokenaddress, pooladdress) => {
    contracts[tokenaddress].methods.allowance(account, pooladdress).call({from:account}, function (error, result) {
        if(!error) {
            userAllowedStakingTokens[pooladdress] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserPoolBalance = async (address, callback) => {
    contracts[address].methods.balanceOf(account).call({from:account}, function (error, result) {
        if(!error) {
            userBalancesPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserRewards = async(address) => {
    if(!contracts[address]) {
        return false;
    }
    contracts[address].methods.earned(account).call({from:account}, function (error, result) {
        if(!error) {
            userRewardsPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}
const fetchTotalDeposited = async(address) => {
    if(!contracts[address]) {
        return false;
    }
    contracts[address].methods.totalSupply().call({from:account}, function (error, result) {
        if(!error) {
            totalBalancesPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}
const fetchRewardRate = async(address) => {
    if(!contracts[address]) {
        return false;
    }
    contracts[address].methods.rewardRate().call({from:account}, function (error, result) {
        if(!error) {
            rewardRates[address] = result;
        } else {
            console.log(error);
        }
    });
}



const fetchUserBalances = function() {
    fetchUserMainBalance();
    for(var i = 0; i < tokens.length; i++) {
        if(tokens[i].address !== false) {
            fetchUserTokenBalance(tokens[i].address);
        }
    }
    for(var i = 0; i < pools.length; i++) {
        fetchUserPoolBalance(pools[i].address, updateDisplay);
        fetchUserRewards(pools[i].address)
        fetchTotalDeposited(pools[i].address)
        fetchRewardRate(pools[i].address)
        if(pools[i].type != "StakingPoolBaseRewarded") {
            var token = getTokenBySymbol(pools[i].stakingToken);
            fetchUserTokenApproved(token.address, pools[i].address);
        }
    }
}


const updateDisplay = function() {
    // 1 pool = main token
    var amount = userBalancesStakingTokens[mainTokenSymbol] / 10**18;
    $('tr[data-pool="' + getPoolId(pools[0])  + '"] .display--user-balance').html(fv(amount));
    $('tr[data-pool="' + getPoolId(pools[0])  + '"] .display--total-staked').html(fv(totalBalancesPools[pools[0].address] / 10**18));
    $('tr[data-pool="' + getPoolId(pools[0])  + '"] .display--user-staked').html(fv(userBalancesPools[pools[0].address] / 10**18));
    $('tr[data-pool="' + getPoolId(pools[0])  + '"] .display--user-reward').html(fv(userRewardsPools[pools[0].address] / 10**getTokenBySymbol(pools[0].rewardToken).decimals));

    for(var i = 1; i < pools.length; i++) {
        var pool = pools[i];
        var stakingToken = getTokenBySymbol(pool.stakingToken);
        var amount = userBalancesStakingTokens[stakingToken.address] / 10**stakingToken.decimals;
        $('tr[data-pool="' + getPoolId(pool)  + '"] .display--user-balance').html(fv(amount));
        $('tr[data-pool="' + getPoolId(pool)  + '"] .display--total-staked').html(fv(totalBalancesPools[pool.address] / 10**getTokenBySymbol(pool.stakingToken).decimals));
        $('tr[data-pool="' + getPoolId(pool)  + '"] .display--user-staked').html(fv(userBalancesPools[pool.address] / 10**getTokenBySymbol(pool.stakingToken).decimals));
        $('tr[data-pool="' + getPoolId(pool)  + '"] .display--user-reward').html(fv(userRewardsPools[pool.address] / 10**getTokenBySymbol(pool.rewardToken).decimals));
    }
}

const fv = function(value) {
    var result = value;
    if(result > 100) {
        result = result * 100;
        result = Math.round(result);
        result = result / 100;
    } else {
        result = result * 10000;
        result = Math.round(result);
        result = result / 10000;
    }
    return result;
}

const updateApy = function() {
    for(var i = 0; i < pools.length; i++) {
        var pool = pools[i];

        var apy = '-';

        if(pool.apyEnabled) {
            if(pool.stakingToken == pool.rewardToken) {
                apy = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                apy = apy / totalBalancesPools[pool.address] * 100; // total rewards per year per deposited token
            }
            apy = Math.round(apy);
            apy+= '<sup>%</sup>';
        }

        $('tr[data-pool="' + getPoolId(pool)  + '"] .display--apy').html(apy);
    }
}





const afterWalletConnect = function() {
    fetchUserBalances();
}






/**
 *  BUTTONS
 */

$('.btn--stake-max').on('click', function(e) {
    var poolId = $(e.target).parents('tr').data('pool');
    var pool = getPoolById(poolId);
    if(!pool.enabled) {
        return false;
    }
    var amount = 0;
    if(pool.stakingToken == mainTokenSymbol) {
        amount = userBalancesStakingTokens[mainTokenSymbol] / 10**18;
    } else {
        amount = userBalancesStakingTokens[getTokenBySymbol(pool.stakingToken).address] / 10**getTokenBySymbol(pool.stakingToken).decimals;
    }
    $('tr[data-pool="' + poolId  + '"] input[name="amount"]').val(amount);

    return false;
});

$('.staking-form').on('submit', function(e) {
    var poolId = $(e.target).parents('tr').data('pool');
    var pool = getPoolById(poolId);
    var amount = $(e.target).find('input[name="amount"]').val();
    if(!amount || amount <= 0) {
        return false;
    }
    amount = new BigNumber(amount*(10**getTokenBySymbol(pool.stakingToken).decimals));
    $('tr[data-pool="' + poolId  + '"] input[name="amount"]').val('');
    var done = false;
    var done2 = false;

    if(pool.stakingToken == mainTokenSymbol) {
        contracts[pool.address].methods.stake(amount.toFixed()).send({from:account,value:amount.toFixed()})
            .on('transactionHash', function(hash){
                message(poolId, 'Staking ... Please wait', hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
                if(!done) {
                    done = true;
                    removeMessage();
                    fetchUserBalances();
                }
            })
            .on('error', function(error){
                console.log(error);
            });
    } else {
        if(userAllowedStakingTokens[pool.address] >= amount) {
            contracts[pool.address].methods.stake(amount.toFixed()).send({from:account})
                .on('transactionHash', function(hash){
                    message(poolId, 'Staking ... Please wait', hash);
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    if(!done) {
                        done = true;
                        removeMessage();
                        fetchUserBalances();
                    }
                })
                .on('error', function(error){
                    console.log(error);
                });
        } else {
            contracts[getTokenBySymbol(pool.stakingToken).address].methods.approve(pool.address, amount.toFixed()).send({from:account})
                .on('transactionHash', function(hash){
                    message(poolId, 'Approving ... Please wait', hash);
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    if(!done) {
                        done = true;
                        contracts[pool.address].methods.stake(amount.toFixed()).send({from:account})
                            .on('transactionHash', function(hash){
                                message(poolId, 'Staking ... Please wait', hash);
                            })
                            .on('confirmation', function(confirmationNumber, receipt){
                                if(!done2) {
                                    done2 = true;
                                    removeMessage();
                                    fetchUserBalances();
                                }
                            })
                            .on('error', function(error){
                                console.log(error);
                            });
                    }
                })
                .on('error', function(error){
                    console.log(error);
                });
        }
    }


    return false;
});

$('.btn--unstake').on('click', function(e) {
    var poolId = $(e.target).parents('tr').data('pool');
    var pool = getPoolById(poolId);
    var done = false;
    contracts[pool.address].methods.exit().send({from:account})
        .on('transactionHash', function(hash){
            message(poolId, 'Unstaking ... Please wait', hash);
        })
        .on('confirmation', function(confirmationNumber, receipt){
            if(!done) {
                done = true;
                removeMessage();
                fetchUserBalances();
            }
        })
        .on('error', function(error){
            console.log(error);
        });

    return false;
});

$('.btn--claim').on('click', function(e) {
    var poolId = $(e.target).parents('tr').data('pool');
    var pool = getPoolById(poolId);
    var done = false;
    contracts[pool.address].methods.getReward().send({from:account})
        .on('transactionHash', function(hash){
            message(poolId, 'Claiming ... Please wait', hash);
        })
        .on('confirmation', function(confirmationNumber, receipt){
            if(!done) {
                done = true;
                removeMessage();
                fetchUserBalances();
            }
        })
        .on('error', function(error){
            console.log(error);
        });

    return false;
});