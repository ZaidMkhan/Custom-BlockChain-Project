const sha256 = require('sha256');

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100, '0', '0' );
}

Blockchain.prototype.createNewBlock = function(nonce, prevBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        prevBlockHash: prevBlockHash,
        hash: hash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index'] +1;
}


Blockchain.prototype.hahsBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.prrofOfWork = function(prevBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hahsBlock(prevBlockHash, currentBlockData, nonce);
    
    while(hash.substring(0,4) !== '0000') {
        nonce++;
        hash = this.hahsBlock(prevBlockHash, currentBlockData, nonce);
        console.log(hash);
    }

    return nonce;
}
