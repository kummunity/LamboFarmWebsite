
const addPools = function () {
    $.get("./tpl_card.html", function (card_content) {
        for (var i = 0; i < pools.length; i++) {
            var pool = pools[i];
            var stakingToken = getTokenBySymbol(pool.stakingToken)
            var poolId = pool.stakingToken + '--' + pool.rewardToken;
            var disabled = !pool.enabled;

            var card = $(card_content).clone();
            if (disabled) {
                $(card).addClass('disabled');
                $(card).find('.staking-form').hide();
                $(card).find('.unstaking-form').hide();
            }
            $(card).attr("data-pool", poolId);
            var tokenId = stakingToken.address ? stakingToken.address : stakingToken.symbol;
            $(card).find('#data-token-store').attr('data-token', tokenId);
            $(card).find('#token-symbol').text('$' + pool.stakingToken);
            $(card).find('.display--user-balance').attr('data-token', tokenId);
            $('#container--pools').append(card);

        }
    }, 'html');
}

const afterWalletConnect = function () {
    initFarm();
}

$(document).ready(function () {
    /*$('#pool-details-dialog').dialog({
        autoOpen: false,
        width: 1000,
        modal: true,
        width: 'auto',
        open: function (event, ui) {
            $('.ui-widget-overlay').bind('click', function () {
                $('#pool-details-dialog').dialog('close');
            });
        }
    });*/
    connectWallet();
    addPools();
    initEvents();
});

const initEvents = function () {
    /*$(function () {
        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 800,
            modal: true,
            buttons: {
                "Delete all items": function () {
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    });*/
    $('#pool-details-dialog').on('show.bs.modal', function (event) {
        $(this).modal('handleUpdate');
        var button = $(event.relatedTarget) // Button that triggered the modal
        var container = button.parents('.pool--container');
        var poolId = container.data('pool');
        var pool = getPoolById(poolId);
        $('#pool-details-dialog').data('pool', poolId);
        var modal = $(this)
        modal.find('.modal-title').text('Manage ' + pool.stakingToken + ' pool')
        $('#pool-details-dialog input[type="text"]').val('');
    })
    $('#pools').on('click', '.open-details', function (e) {
        var container = $(e.target).parents('.pool--container');
        var poolId = container.data('pool');
        var pool = getPoolById(poolId);
        $('#pool-details-dialog').data('pool', poolId);
        $('#pool-details-dialog').dialog('option', 'title', 'Manage ' + pool.stakingToken + ' pool');
        $('#pool-details-dialog input[type="text"]').val('');
        $('#pool-details-dialog').dialog('open');
    });
    $('#pools').on('click', '.pool--container', function (e) {
        $(e.target).find('.toggle-container').trigger('click');
    });
    $('#pools').on('click', '.title', function (e) {
        $(e.target).parents('.pool--container').find('.toggle-container').trigger('click');
    });
    $('#pools').on('click', '.toggle-container', function (e) {
        var details = $(e.target).parents('.pool--container').find('.pool-details');
        //var isCurrentlyCollapsed = $(details).is(":hidden");
        $(details).toggle("slow", function () {
            $(details).is(":hidden") ? $(e.target).addClass('collapsed') : $(e.target).removeClass('collapsed');
        });
        return false;
    });

    $('#pool-details-dialog').on('click', '.btn--claim-rewards', function (e) {
        var poolId = $('#pool-details-dialog').data('pool');
        var pool = getPoolById(poolId);
        var done = false;
        var contract = new window.web3.eth.Contract(abiPool, pool.address);
        contract.methods.getReward().send({ from: account })
            .on('transactionHash', function (hash) {
                message(poolId, 'Claiming Rewards... Please wait', hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (!done) {
                    done = true;
                    removeMessage();
                    updateEverything();
                }
            })
            .on('error', function (error) {
                console.log(error);
            });

        return false;
    });

    $('#pool-details-dialog').on('click', '.btn--exit', function (e) {
        var poolId = $('#pool-details-dialog').data('pool');
        var pool = getPoolById(poolId);
        var done = false;
        var contract = new window.web3.eth.Contract(abiPool, pool.address);
        contract.methods.exit().send({ from: account })
            .on('transactionHash', function (hash) {
                message(poolId, 'Claiming Rewards... Please wait', hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (!done) {
                    done = true;
                    removeMessage();
                    updateEverything();
                }
            })
            .on('error', function (error) {
                console.log(error);
            });

        return false;
    });

    $('#pool-details-dialog').on('click', '.btn--stake-max', function (e) {
        var poolId = $('#pool-details-dialog').data('pool');
        var pool = getPoolById(poolId);
        var token = getTokenBySymbol(pool.stakingToken);
        if (!pool.enabled) {
            return false;
        }
        var amount = weiToDecimal(userBalancesTokens[token.address], token.symbol);
        if (token.is_main) {
            amount = weiToDecimal(userBalancesTokens[mainTokenSymbol], token.symbol);
        }
        $('#pool-details-dialog').find('.staking-form input[name="amount"]').val(amount);
        return false;
    });

    $('#pool-details-dialog').on('submit', '.staking-form', function (e) {
        if (chainId != 321) {
            alert('Wrong network or chain, please connect to KCC and refresh this page');
        }
        var poolId = $('#pool-details-dialog').data('pool');
        var pool = getPoolById(poolId);
        var amount = $(e.target).find('input[name="amount"]').val();
        if (!amount || amount <= 0) {
            return false;
        }
        amount = new BigNumber(amount * (10 ** getTokenBySymbol(pool.stakingToken).decimals));
        $(e.target).find('input[name="amount"]').val('');
        var done = false;
        var done2 = false;

        if (pool.stakingToken == mainTokenSymbol) {
            var contract = new window.web3.eth.Contract(abiPoolMain, pool.address);
            contract.methods.stake(amount.toFixed()).send({ from: account, value: amount.toFixed() })
                .on('transactionHash', function (hash) {
                    message(poolId, 'Staking ... Please wait', hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    if (!done) {
                        done = true;
                        removeMessage();
                        updateEverything();
                    }
                })
                .on('error', function (error) {
                    console.log(error);
                });
        } else {
            if (parseFloat(userAllowedStakingTokens[pool.address]) >= parseFloat(amount.toFixed())) {
                var contract = new window.web3.eth.Contract(abiPool, pool.address);
                contract.methods.stake(amount.toFixed()).send({ from: account })
                    .on('transactionHash', function (hash) {
                        message(poolId, 'Staking ... Please wait', hash);
                    })
                    .on('confirmation', function (confirmationNumber, receipt) {
                        if (!done) {
                            done = true;
                            removeMessage();
                            updateEverything();
                        }
                    })
                    .on('error', function (error) {
                        console.log(error);
                    });
            } else {
                var contract = new window.web3.eth.Contract(abiERC20, getTokenBySymbol(pool.stakingToken).address);
                var approveAmount = new BigNumber(1000000000 * (10 ** 18));
                contract.methods.approve(pool.address, approveAmount.toFixed()).send({ from: account })
                    .on('transactionHash', function (hash) {
                        message(poolId, 'Approving ... Please wait', hash);
                    })
                    .on('confirmation', function (confirmationNumber, receipt) {
                        if (!done) {
                            done = true;
                            var contract = new window.web3.eth.Contract(abiPool, pool.address);
                            contract.methods.stake(amount.toFixed()).send({ from: account })
                                .on('transactionHash', function (hash) {
                                    message(poolId, 'Staking ... Please wait', hash);
                                })
                                .on('confirmation', function (confirmationNumber, receipt) {
                                    if (!done2) {
                                        done2 = true;
                                        removeMessage();
                                        updateEverything();
                                    }
                                })
                                .on('error', function (error) {
                                    console.log(error);
                                });
                        }
                    })
                    .on('error', function (error) {
                        console.log(error);
                    });
            }
        }


        return false;
    });

    $('#pool-details-dialog').on('click', '.btn--unstake-max', function (e) {
        var poolId = $('#pool-details-dialog').data('pool');
        var pool = getPoolById(poolId);
        var token = getTokenBySymbol(pool.stakingToken);
        if (!pool.enabled) {
            return false;
        }
        var amount = weiToDecimal(userBalancesPools[pool.address], token.symbol);
        console.log(amount);
        $('#pool-details-dialog').find('.unstaking-form input[name="amount"]').val(amount);
        return false;
    });

    $('#pool-details-dialog').on('submit', '.unstaking-form', function (e) {
        var poolId = $(e.target).parents('.pool--container').data('pool');
        var pool = getPoolById(poolId);
        var amount = $(e.target).find('input[name="amount"]').val();
        if (!amount || amount <= 0) {
            return false;
        }
        amount = new BigNumber(amount * (10 ** getTokenBySymbol(pool.stakingToken).decimals));
        $(e.target).find('input[name="amount"]').val('');
        var done = false;
        var contract = new window.web3.eth.Contract(abiPool, pool.address);
        contract.methods.withdraw(amount.toFixed()).send({ from: account })
            .on('transactionHash', function (hash) {
                message(poolId, 'Unstaking ... Please wait', hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (!done) {
                    done = true;
                    removeMessage();
                    updateEverything();
                }
            })
            .on('error', function (error) {
                console.log(error);
            });

        return false;
    });

    $('#pools').on('click', '.btn--claim-all', function (e) {
        claimAll();
        return false;
    });

    $('#pools').on('change', 'input[name="pools_switch"]', function (e) {
        if ($(e.target).val() == 0) {
            $('#container--pools').removeClass('only-own-pools');
        } else {
            $('#container--pools').addClass('only-own-pools');
        }
    });
};
var claimAllPools = [];
var claimAllIndex = 0;
var claimAllActive = false;
const claimNext = function () {
    if (claimAllIndex == claimAllPools.length) {
        claimAllActive = false;
        removeMessage();
        message('CLAIMALLFUNC', 'Nothing more to claim');
    } else {
        var done = false;
        var contract = new window.web3.eth.Contract(abiPool, claimAllPools[claimAllIndex].address);
        var stakingToken = getTokenBySymbol(claimAllPools[claimAllIndex].stakingToken)
        contract.methods.getReward().send({ from: account })
            .on('transactionHash', function (hash) {
                message('CLAIMALLFUNC', 'Claiming $' + stakingToken + ' ... Please wait', hash);
                console.log(hash);
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                if (!done) {
                    removeMessage();
                    message('CLAIMALLFUNC', 'Done ... Next one');
                    done = true;
                    updateEverything();
                    claimAllIndex++;
                    claimNext();
                }
            })
            .on('error', function (error) {
                console.log(error);
                message('CLAIMALLFUNC', 'Error');
                claimAllActive = false;
            });
    }
}
const claimAll = function () {
    claimAllPools = [];
    for (var i = 0; i < pools.length; i++) {
        if (userRewardsPools[pools[i].address] > 0) {
            claimAllPools.push(pools[i]);
        }
    }
    message('CLAIMALLFUNC', claimAllPools.length + ' Pools to claim');
    if (claimAllPools.length > 0) {
        claimAllActive = true;
        claimNext()
    }
}

