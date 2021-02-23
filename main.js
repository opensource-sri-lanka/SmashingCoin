// Packages
const fs = require('fs')
const chalk = require('chalk')
const date = require('date-and-time');
var rn = require('random-number');
const secureRandom = require('secure-random');

// Files
const CryptoBlockChain = require('./Models/CryptoBlockChain');
const CryptoBlock = require('./Models/CryptoBlock');

// Declarations
const now = new Date();
var gen = rn.generator({
    min: -1000
    , max: 1000
    , integer: true
})
const max = Buffer.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140", 'hex');
let isInvalid = true;
let privateKey;
while (isInvalid) {
    privateKey = secureRandom.randomBuffer(32);
    if (Buffer.compare(max, privateKey) === 1) {
        isInvalid = false;
    }
}


console.log('> Private key: ', privateKey.toString('hex'));
let smashingCoin = new CryptoBlockChain();
smashingCoin.addNewBlock(new CryptoBlock(gen(500), date.format(now, 'YYYY/MM/DD HH:mm:ss'), { senderId: 1, recipientId: 2, quantity: 50000 }))

console.log(JSON.stringify(smashingCoin, null, 4));