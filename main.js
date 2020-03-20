// 区块链
// block
// chain

// data
// 之前区块的哈希值
// 自己的哈希值： 它是由存储在区块里的信息 算出来的 (data + 之前区块的哈希值)
const { Transaction, Chain, Block } = require("./blockChain");

const luotuoCoin = new Chain();
const t1 = new Transaction("addr1", "addr2", 10);
const t2 = new Transaction("addr2", "addr1", 5);
luotuoCoin.addTransaction(t1);
luotuoCoin.addTransaction(t2);

// console.log(luotuoCoin)
luotuoCoin.mineTransactionPool("addr3");
console.log(luotuoCoin);
console.log(luotuoCoin.chain[1]);
console.log(luotuoCoin.chain[1].transactions);


// const block1 = new Block("转账十元", "");
// luotuoChain.addBlockToChain(block1);
// const block2 = new Block("转账十个十元", "");
// luotuoChain.addBlockToChain(block2);
// console.log(luotuoChain.validateChain())

//尝试篡改这个区块链
// luotuoChain.chain[1].data = "转账一百个十元";
// luotuoChain.chain[1].mine(5);
// console.log(luotuoChain);
// console.log(luotuoChain.validateChain());
