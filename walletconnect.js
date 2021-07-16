var web3;
var account;

var chainId = 0;




const connectWallet = function () {

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    };

    // Check if User is already connected by retrieving the accounts
    var accounts = web3.eth.getAccounts().then((addr) => {
        if (addr.length > 0) {
            //Wallet is connected
            web3.eth.getChainId().then(e => {
                chainId = e;
                if (chainId != 321) {
                    //Open popup to with info
                    $('#wallet-connect-wrong-chain-dialog').modal('open');
                }
            });
            account = addr[0];
            $('#account-address').show();
            $('#connect-wallet-btn').remove();
            $('#account-address').text(account);
            afterWalletConnect();
        }
        else {

            $('#connect-wallet-btn').show();
            $('#account-address').hide();
        }
        $("#wallet-connect-dialog").removeClass("in");
        $(".modal-backdrop").remove();
        $('#wallet-connect-dialog').modal('hide');
    });
};
