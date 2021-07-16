var contracts = [];
var contractsPairs = [];
var userBalancesStakingTokens = [];
var userAllowedStakingTokens = [];
var userBalancesPools = [];
var userBalancesTokens = [];
var userRewardsPools = [];
var totalBalancesPools = [];
var totalSupply = [];
var totalStaked = [];
var rewardRates = [];
var reserves = [];

const getTokenByAddress = function (address) {
    for (var i = 0; i < tokens.length; i++) {
        if (address == tokens[i].address) {
            return tokens[i];
        }
    }
    return false;
}

const getTokenBySymbol = function (symbol) {
    for (var i = 0; i < tokens.length; i++) {
        if (symbol == tokens[i].symbol) {
            return tokens[i];
        }
    }
    return false;
}

const getPoolId = function (pool) {
    return pool.stakingToken + '--' + pool.rewardToken;
}

const getPoolByAddress = function (address) {
    for (var i = 0; i < pools.length; i++) {
        if (address == pools[i].address) {
            return pools[i];
        }
    }
}

const getPoolById = function (id) {
    for (var i = 0; i < pools.length; i++) {
        if (id == getPoolId(pools[i])) {
            return pools[i];
        }
    }
}



const weiToDecimal = function (value, tokenSymbol) {
    return value / (10 ** getTokenBySymbol(tokenSymbol).decimals);
}

const getPoolByStakingToken = function (stakingTokenSymbol) {
    for (var i = 0; i < pools.length; i++) {
        if (stakingTokenSymbol == pools[i].stakingToken) {
            return pools[i];
        }
    }
    return false;
}

const getPairByTokenSymbols = function (baseTokenSymbol, quoteTokenSymbol) {
    for (var i = 0; i < pairs.length; i++) {
        if (baseTokenSymbol == pairs[i].token0 && quoteTokenSymbol == pairs[i].token1) {
            return pairs[i];
        } else if (baseTokenSymbol == pairs[i].token1 && quoteTokenSymbol == pairs[i].token0) {
            return pairs[i];
        }
    }
    return false;
}

const getTokenPrice = function (tokenSymbol, quoteTokenSymbol) {
    if (quoteTokenSymbol != mainTokenSymbol) {
        return -1;
    }
    if (tokenSymbol == quoteTokenSymbol) {
        return 1;
    }
    var pair = getPairByTokenSymbols(tokenSymbol, quoteTokenSymbol);

    if (!reserves[pair.address]) {
        return 0;
    }

    var token = getTokenBySymbol(tokenSymbol);
    var quoteToken = getTokenBySymbol(quoteTokenSymbol);

    var reserve0 = reserves[pair.address][0] / (10 ** token.decimals);
    var reserve1 = reserves[pair.address][1] / (10 ** quoteToken.decimals);

    if (pair.is_switched === true) {
        reserve0 = reserves[pair.address][0] / (10 ** quoteToken.decimals);
        reserve1 = reserves[pair.address][1] / (10 ** token.decimals);
        return reserve0 / reserve1;
    }
    return reserve1 / reserve0;
}





const message = function (poolId, message, txHash) {
    removeMessage();
    if (txHash) {
        message += ' <a href="' + explorerUrl + txHash + '" target="_blank">View TX</a>';
    }
    $('*[data-pool="' + poolId + '"] .messages').html(message);
}

const removeMessage = function () {
    $('.messages').html('');
}


const fetchUserMainBalance = async () => {
    web3.eth.getBalance(account, function (error, result) {
        if (!error) {
            userBalancesStakingTokens[mainTokenSymbol] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserTokenBalance = async (address) => {
    if (!contracts[address]) {
        return false;
    }
    contracts[address].methods.balanceOf(account).call({ from: account }, function (error, result) {
        if (!error) {
            userBalancesStakingTokens[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserTokenApproved = async (tokenaddress, pooladdress) => {
    contracts[tokenaddress].methods.allowance(account, pooladdress).call({ from: account }, function (error, result) {
        if (!error) {
            userAllowedStakingTokens[pooladdress] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserPoolBalance = async (address, callback) => {
    contracts[address].methods.balanceOf(account).call({ from: account }, function (error, result) {
        if (!error) {
            userBalancesPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}

const fetchUserRewards = async (address) => {
    if (!contracts[address]) {
        return false;
    }
    contracts[address].methods.earned(account).call({ from: account }, function (error, result) {
        if (!error) {
            userRewardsPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}
const fetchTotalDeposited = async (address) => {
    if (!contracts[address]) {
        return false;
    }
    contracts[address].methods.totalSupply().call({ from: account }, function (error, result) {
        if (!error) {
            totalBalancesPools[address] = result;
        } else {
            console.log(error);
        }
        updateDisplay();
    });
}
const fetchRewardRate = async (address) => {
    if (!contracts[address]) {
        return false;
    }
    contracts[address].methods.rewardRate().call({ from: account }, function (error, result) {
        if (!error) {
            rewardRates[address] = result;
        } else {
            console.log(error);
        }
    });
}
const fetchPairPrice = async (address) => {
    if (!contractsPairs[address]) {
        return false;
    }
    contractsPairs[address].methods.getReserves().call({ from: account }, function (error, result) {
        if (!error) {
            reserves[address] = result;
        } else {
            console.log(error);
        }
    });
}
const fetchLPTotalSupply = async (address) => {
    if (!contractsPairs[address]) {
        return false;
    }
    contractsPairs[address].methods.totalSupply().call({ from: account }, function (error, result) {
        if (!error) {
            totalSupply[address] = result;
        } else {
            console.log(error);
        }
    });
}



const fetchUserBalances = function () {
    fetchUserMainBalance();
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].address !== false) {
            fetchUserTokenBalance(tokens[i].address);
        }
        if (tokens[i].pair !== false) {
            fetchPairPrice(tokens[i].pair);
        }
        if (tokens[i].is_lp == true) {
            fetchLPTotalSupply(tokens[i].address);
        }
    }
    for (var i = 0; i < pools.length; i++) {
        fetchUserPoolBalance(pools[i].address, updateDisplay);
        fetchUserRewards(pools[i].address)
        fetchTotalDeposited(pools[i].address)
        fetchRewardRate(pools[i].address)
        if (pools[i].type != "StakingPoolBaseRewarded") {
            var token = getTokenBySymbol(pools[i].stakingToken);
            fetchUserTokenApproved(token.address, pools[i].address);
        }
    }
}


const updateDisplay = function () {
    // 1 pool = main token
    var amount = userBalancesStakingTokens[mainTokenSymbol] / 10 ** 18;
    $('tr[data-pool="' + getPoolId(pools[0]) + '"] .display--user-balance').html(fv(amount));
    $('tr[data-pool="' + getPoolId(pools[0]) + '"] .display--total-staked').html(fv(totalBalancesPools[pools[0].address] / 10 ** 18));
    $('tr[data-pool="' + getPoolId(pools[0]) + '"] .display--user-staked').html(fv(userBalancesPools[pools[0].address] / 10 ** 18));
    $('tr[data-pool="' + getPoolId(pools[0]) + '"] .display--user-reward').html(fv(userRewardsPools[pools[0].address] / 10 ** getTokenBySymbol(pools[0].rewardToken).decimals));

    for (var i = 1; i < pools.length; i++) {
        var pool = pools[i];
        var stakingToken = getTokenBySymbol(pool.stakingToken);
        var amount = userBalancesStakingTokens[stakingToken.address] / 10 ** stakingToken.decimals;
        $('tr[data-pool="' + getPoolId(pool) + '"] .display--user-balance').html(fv(amount));
        $('tr[data-pool="' + getPoolId(pool) + '"] .display--total-staked').html(fv(totalBalancesPools[pool.address] / 10 ** getTokenBySymbol(pool.stakingToken).decimals));
        $('tr[data-pool="' + getPoolId(pool) + '"] .display--user-staked').html(fv(userBalancesPools[pool.address] / 10 ** getTokenBySymbol(pool.stakingToken).decimals));
        $('tr[data-pool="' + getPoolId(pool) + '"] .display--user-reward').html(fv(userRewardsPools[pool.address] / 10 ** getTokenBySymbol(pool.rewardToken).decimals));
    }
}
const fv = function (value) {
    return fvd(value, 2);
}
const fvd = function (value, digits) {
    var result = value;
    if (result > 1000000000000) {   // 1t
        result = result / 1000000000000;
        result = result.toFixed(digits);
        result += 't';
    } else if (result > 1000000000) {   // 1b
        result = result / 1000000000;
        result = result.toFixed(digits);
        result += 'b';
    } else if (result > 1000000) {   // 1m
        result = result / 1000000;
        result = result.toFixed(digits);
        result += 'm';
    } else if (result > 1000) {
        result = result / 1000;
        result = result.toFixed(digits);
        result += 'k';
    } else if (result > 100) {
        result = Math.round(result);
    } else {
        result = Number(result).toFixed(digits);
    }
    return result;
};

const updateApy = function () {
    for (var i = 0; i < pools.length; i++) {
        var pool = pools[i];

        var apy = '-';

        if (pool.apyEnabled) {
            if (pool.stakingToken == pool.rewardToken) {
                apy = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                apy = apy / totalBalancesPools[pool.address] * 100; // total rewards per year per deposited token
            } else if (getTokenBySymbol(pool.stakingToken).is_lp == true) {
                var totalSupplyLPInLambo = reserves[pool.pair][0] * 2;
                apy = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                apy = apy / totalSupplyLPInLambo * 100;

            } else if (pool.stakingToken == mainTokenSymbol) {
                apy = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                var lamboprice = reserves['0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'][1] / reserves['0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'][0];
                apy = apy * lamboprice;
                var worth = totalBalancesPools[pool.address];
                apy = apy / worth * 100;
            } else {
                if (reserves[pool.pair]) {
                    apy = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                    var lamboprice = reserves['0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'][1] / reserves['0xefcfa1f3cb9828bbc60e3a47cffc7910ae7c35d9'][0];
                    apy = apy * lamboprice;
                    var pairPrice = reserves[pool.pair][1] / reserves[pool.pair][0];
                    if (pool.switched == true) {
                        pairPrice = reserves[pool.pair][0] / reserves[pool.pair][1];
                    }
                    var worth = totalBalancesPools[pool.address] * pairPrice;
                    apy = apy / worth * 100;
                }
            }
            apy = fv(apy);
            apy += ' %';
        }

        $('tr[data-pool="' + getPoolId(pool) + '"] .display--apy').html(apy);
    }
}



const fetchMainTokenUserBalance = function () {
    web3.eth.getBalance(account, function (error, result) {
        if (!error) {
            userBalancesTokens[mainTokenSymbol] = result;
        } else {
            console.log(error);
        }
    });
    updateToken(mainTokenSymbol)
}

const fetchTokenUserBalance = function (address) {
    var contract = new window.web3.eth.Contract(abiERC20, address);
    contract.methods.balanceOf(account).call({ from: account }, function (error, result) {
        if (!error) {
            userBalancesTokens[address] = result;
        } else {
            console.log(error);
        }
        updateToken(address);
    });
}

const fetchPoolApproval = function (address) {
    var pool = getPoolByAddress(address);
    var stakingToken = getTokenBySymbol(pool.stakingToken);
    var contract = new window.web3.eth.Contract(abiERC20, stakingToken.address);
    contract.methods.allowance(account, address).call({ from: account }, function (error, result) {
        if (!error) {
            userAllowedStakingTokens[address] = result;
        } else {
            console.log(error);
        }
    });
}

const fetchPoolRewardRate = function (address) {
    var contract = new window.web3.eth.Contract(abiPool, address);
    contract.methods.rewardRate().call({ from: account }, function (error, result) {
        if (!error) {
            rewardRates[address] = result;
        } else {
            console.log(error);
        }
        updatePool(address);
    });
}

const fetchPoolUserBalance = function (address) {
    var contract = new window.web3.eth.Contract(abiPool, address);
    contract.methods.balanceOf(account).call({ from: account }, function (error, result) {
        if (!error) {
            userBalancesPools[address] = result;
        } else {
            console.log(error);
        }
        updatePool(address);
    });
}

const fetchPoolUserRewards = function (address) {
    var contract = new window.web3.eth.Contract(abiPool, address);
    contract.methods.earned(account).call({ from: account }, function (error, result) {
        if (!error) {
            userRewardsPools[address] = result;
        } else {
            console.log(error);
        }
        updatePool(address);
    });
}

const fetchPoolTotalStaked = function (address) {
    var contract = new window.web3.eth.Contract(abiPool, address);
    contract.methods.totalSupply().call({ from: account }, function (error, result) {
        if (!error) {
            totalStaked[address] = result;
        } else {
            console.log(error);
        }
        updatePool(address);
    });
}

const fetchPairReserves = function (pair_address) {
    var contract = new window.web3.eth.Contract(abiUniswapPair, pair_address);
    contract.methods.getReserves().call({ from: account }, function (error, result) {
        if (!error) {
            reserves[pair_address] = result;
        } else {
            console.log(error);
        }
    });
}

const fetchAllTokens = function () {
    fetchMainTokenUserBalance();
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (token.address) {
            fetchTokenUserBalance(token.address);
        } else {
            // probably main token
        }
    }
}

const fetchAllPools = function () {
    for (var i = 0; i < pools.length; i++) {
        var pool = pools[i];
        fetchPoolTotalStaked(pool.address);
        fetchPoolUserBalance(pool.address);
        fetchPoolUserRewards(pool.address);
        fetchPoolRewardRate(pool.address);
        if (pool.stakingToken != mainTokenSymbol) {
            fetchPoolApproval(pool.address);
        }
        if (pool.pair) {
            fetchPairReserves(pool.pair);
        }
    }
}

const updateToken = function (address) {
    if (address == mainTokenSymbol) {
        if (userBalancesTokens[mainTokenSymbol] >= 0) {
            $('.display--user-balance[data-token="' + mainTokenSymbol + '"]').html(
                fv(weiToDecimal(userBalancesTokens[mainTokenSymbol], mainTokenSymbol))
            );
        }
    } else {
        var token = getTokenByAddress(address);
        if (userBalancesTokens[address] >= 0) {
            $('.display--user-balance[data-token="' + address + '"]').html(
                fv(weiToDecimal(userBalancesTokens[address], token.symbol))
            );
        }
    }
}

const getTVL = function (pool) {
    if (getTokenBySymbol(pool.stakingToken).is_lp == true) {
        if (!reserves[pool.pair]) {
            return 0;
        }
        var totalSupplyLPInLambo = reserves[pool.pair][1] * 2;
        return totalSupplyLPInLambo / (10 ** 18);
        var tokenPrice = getTokenPrice('LAMBO', mainTokenSymbol);
        console.log(tokenPrice);
        console.log(totalSupplyLPInLambo);
        console.log(weiToDecimal(totalSupplyLPInLambo, pool.stakingToken));
        console.log(tokenPrice * weiToDecimal(totalSupplyLPInLambo, pool.stakingToken));
        return tokenPrice * weiToDecimal(totalSupplyLPInLambo, pool.stakingToken);
    }
    var tokenPrice = getTokenPrice(pool.stakingToken, mainTokenSymbol);
    return tokenPrice * weiToDecimal(totalStaked[pool.address], pool.stakingToken);
}

const updatePool = function (address) {
    var pool = getPoolByAddress(address);
    var stakingToken = getTokenBySymbol(pool.stakingToken);

    // pool
    if (totalStaked[address] >= 0) {
        $('*[data-pool="' + getPoolId(pool) + '"] .display--total-staked').html(
            fv(weiToDecimal(totalStaked[address], pool.stakingToken))
        );
    }
    if (userRewardsPools[address] >= 0) {
        $('*[data-pool="' + getPoolId(pool) + '"] .display--user-reward').html(
            fv(weiToDecimal(userRewardsPools[address], pool.rewardToken))
        );
    }
    if (userBalancesPools[address] >= 0) {
        $('*[data-pool="' + getPoolId(pool) + '"] .display--user-staked').html(
            fv(weiToDecimal(userBalancesPools[address], pool.stakingToken))
        );
    }

    if (userBalancesPools[address] == 0) {
        $('*[data-pool="' + getPoolId(pool) + '"]').addClass('empty-pool');
    }



    var apr = '-';
    if (pool.apyEnabled) {
        if (pool.stakingToken == pool.rewardToken) {
            if (rewardRates[pool.address] > 0 && totalStaked[pool.address] > 0) {
                apr = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                apr = apr / totalStaked[pool.address] * 100; // total rewards per year per deposited token
            }
        } else if (pool.stakingToken == mainTokenSymbol) {
            if (rewardRates[pool.address]) {
                var rewardTokenPrice = getTokenPrice(pool.rewardToken, mainTokenSymbol);
                if (rewardTokenPrice > 0) {
                    apr = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                    apr = apr * rewardTokenPrice;
                    apr = apr / weiToDecimal(totalStaked[pool.address], pool.stakingToken) * 100;
                    apr = apr / (10 ** 9);
                }
            }
        } else if (stakingToken.is_lp === true) {
            if (reserves[pool.pair] && rewardRates[pool.address] > 0) {
                var totalSupplyLPInLambo = reserves[pool.pair][0] * 2;
                apr = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                apr = apr / totalSupplyLPInLambo * 100;
            }
        } else {
            if (reserves[pool.pair] && rewardRates[pool.address] > 0) {
                var rewardTokenPrice = getTokenPrice(pool.rewardToken, mainTokenSymbol);
                var stakingTokenPrice = getTokenPrice(pool.stakingToken, mainTokenSymbol);
                if (rewardTokenPrice > 0 && stakingTokenPrice > 0) {
                    apr = rewardRates[pool.address] * 60 * 60 * 24 * 365; // total rewards per year
                    apr = apr * rewardTokenPrice;
                    var worth = weiToDecimal(totalStaked[pool.address], pool.stakingToken) * stakingTokenPrice;
                    apr = (apr / worth * 100) / (10 ** 9);
                }
            }
        }
        apr = Math.round(apr) + "%";

        $('*[data-pool="' + getPoolId(pool) + '"] .display--apr').html(apr);
        var tvl = getTVL(pool);
        $('*[data-pool="' + getPoolId(pool) + '"] .display--tvl').html(fv(tvl));
    }
};

const updateInfo = function () {
    var price = getTokenPrice('LAMBO', 'KCS');
    var value = '-';
    if (price) {
        value = fvd(price, 5) + ' KCS';
        if (kcs_usd_price > 0) {
            value += "<br />";
            value += '$' + fvd(price * kcs_usd_price, 5);
        }
    }
    $('.display--lambo-price').html(value);
    var totalTVL = 0;
    for (var i = 0; i < pools.length; i++) {
        totalTVL += getTVL(pools[i]);
    }
    if (totalTVL >= 0) {
        value = fv(totalTVL) + ' KCS';
        if (kcs_usd_price > 0) {
            value += "<br />";
            value += '$' + fv(totalTVL * kcs_usd_price);
        }
        $('.display--total-tvl').html(value);
    }

    var totalRewards = 0;
    for (var i = 0; i < pools.length; i++) {
        totalRewards += weiToDecimal(userRewardsPools[pools[i].address], pools[i].rewardToken);
    }
    if (totalRewards >= 0) {
        value = fv(totalRewards) + ' LAMBO';
        if (kcs_usd_price > 0) {
            value += "<br />";
            value += '$' + fv(totalRewards * price * kcs_usd_price);
        }
        $('.display--total-rewards').html(value);
    }
}

const updateEverything = function () {
    fetchAllTokens();
    fetchAllPools();
    updateInfo();
}

const initFarm = function () {
    console.log('init farm');
    updateEverything();

    var intervalId = window.setInterval(function () {
        updateEverything();
    }, 5000);

}

