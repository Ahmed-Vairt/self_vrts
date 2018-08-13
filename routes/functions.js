var Web3 = require('web3');
var express = require('express');
var router = express.Router();
var http = require("http");

var wallet = require('ethereumjs-wallet');

bodyParser = require('body-parser').json();


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var abi = web3.eth.contract([
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "dinvestment",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Dinvestment",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Investment",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "investment",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "vrtBalance",
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
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "symbol",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "decimals",
                "type": "uint8"
            },
            {
                "name": "balance",
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
                "name": "",
                "type": "address"
            }
        ],
        "name": "dinvest",
        "outputs": [
            {
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
        "name": "getOwner",
        "outputs": [
            {
                "name": "ownerAddress",
                "type": "address"
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
                "name": "",
                "type": "address"
            }
        ],
        "name": "investmentReleaseRequest",
        "outputs": [
            {
                "name": "investorConsent",
                "type": "bool"
            },
            {
                "name": "investorReleaseValue",
                "type": "uint256"
            },
            {
                "name": "investorTokenId",
                "type": "uint256"
            },
            {
                "name": "tokenOwnerConsent",
                "type": "bool"
            },
            {
                "name": "tokenOwnerReleaseValue",
                "type": "uint256"
            },
            {
                "name": "tokenOwnerTokenId",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "_supplyBalance",
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
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "vested",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "symbol",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "decimals",
                "type": "uint8"
            },
            {
                "name": "balance",
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
                "name": "_investor",
                "type": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "vestedBalance",
        "outputs": [
            {
                "name": "vestedAmount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);

var fn = abi.at('0x00f204d7eddd67b5aadaa1595f82b2f3778bd91c');
// console.log(fn);



//Getting OWNER OF ACCOUNT
router.get('/getOwner', bodyParser, function (req, res) {

        // fn.getOwner((err,res) => {
        //     if (res)
        //     console.log("Owner Account is : " + res);
        //     return res;
        // });
    let data = {
        message: fn.getOwner()
    };
    res.status(200).send(data);
    console.log("Checking Owner Address");
});

// CREATE ETHEREUM WALLET
// INPUT : PASSPHRASE
// OUTPUT : WALLET INFO JSON
router.get('/create/wallet/:passphrase', async function (req, res) {
    if (req.params.passphrase !== '') {
        let walletObj = await wallet.generate(req.params.passphrase);
        if (walletObj.getAddressString() == '') {
            res.send({ sucess: false, message: 'Unable to create wallet' });
        } else {
            let responseObj = {
                success: true,
                message: "Wallet created successfully!",
                WalletAddress: walletObj.getAddressString(),
                privateKey: walletObj.getPrivateKeyString(),
                keyValueJson: walletObj.toV3(req.params.passphrase)
            }
            res.send(responseObj);
            console.log("Wallet has been created Successfully......" + walletObj.getAddressString());
        }
    } else {
        res.send({ sucess: false, message: 'Please provide passphrase to create wallet' });
    }
});


//Getting Balance in Vested and Non Vested VRTs
//INPUT : ADDRESS , TOKEN ID
//OUTPUT : Balance
router.get('/getBalance/:adress/:tokenId', bodyParser, function (req, res) {

    let data = {
        message: fn.balanceOf(req.params.adress,req.params.tokenId)
    };
    res.status(200).send(data);
    console.log("Checking Balance in Account");
});



//Transfer Balance to some other account
//INPUT : Address of other account , Amount to transfer, Token ID (only from "1" VESTED VRT'S is alllowed)
//OUTPUT : Transaction ID
router.get('/transfer/:toAdress/:amount/:tokenId', bodyParser, function (req, res) {

    if (req.params.tokenId == 1){
        let data = {
            message: fn.transfer(req.params.toAdress,req.params.amount,req.params.tokenId)
        };
        res.status(200).send(data);
        console.log("Amount Transfered");
    }
    else {
        let data = {
            message: "Only VESTED VRT's can be transfer"
        };
        res.status(200).send(data);
        console.log("Transaction is not allowed");
    }
});

module.exports = router;