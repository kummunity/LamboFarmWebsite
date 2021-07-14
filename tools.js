var web3 = new Web3(Web3.givenProvider);
var account;

var chainId = 0;

const connectWallet = async (callback) => {
    try {
        await window.ethereum.enable();
        window.web3.eth.getAccounts().then(e => {
            account = e[0];
            console.log('wallet connected: ' + account);
            afterWalletConnect();
            web3.eth.getChainId().then(e => {
                chainId = e;
                if(chainId != 321) {
                    alert('Wrong network or chain, please connect to KCC and refresh this page');
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

