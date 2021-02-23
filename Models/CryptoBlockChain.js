// Packages
const date = require('date-and-time');

// Import CryptoBlock
const CryptoBlock = require('./CryptoBlock');

// Declarations
const now = new Date();

class CryptoBlockChain {
    constructor() {
        // array of blocks
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }

    /**
     * @return {CryptoBlock}
     */
    startGenesisBlock() {
        return new CryptoBlock(0, date.format(now, 'YYYY/MM/DD HH:mm:ss'), "Starting Block", "0");
    }

    /**
     * @return {CryptoBlock}
     */
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    /**
     * Proof of working mechanism
     * @param {CryptoBlock} newBlock
     */
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        //newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }

    /**
     * verify if the hash of every block had been tampered with
     * @return {boolean}
     */
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
    }
}
module.exports = CryptoBlockChain;