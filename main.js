// 区块链
// block
// chain

// data
// 之前区块的哈希值
// 自己的哈希值： 它是由存储在区块里的信息 算出来的 (data + 之前区块的哈希值)
const sha256 = require("crypto-js/sha256");

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    // this.timestamp = timestamp;
  }
}

class Block {
  constructor(transactions, previousHash) {
    // data 是 string
    // data -> transaction <-> array of objects
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.nonce = 1;
    this.hash = this.computeHash();
  }

  computeHash() {
    // data 需要 stringify
    // JSON.stringify
    return sha256(
      JSON.stringify(this.transactions) +
        this.previousHash +
        this.nonce +
        this.timestamp
    ).toString();
  }

  getAnswer(difficulty) {
    //开头前n位为0的hash
    let answer = "";
    for (let i = 0; i < difficulty; i++) {
      answer += "0";
    }
    return answer;
  }
  //计算复合区块链难度要求的hash
  // 什么是 复合区块链难度要求的hash
  mine(difficulty) {
    while (true) {
      this.hash = this.computeHash();
      if (this.hash.substring(0, difficulty) !== this.getAnswer(difficulty)) {
        this.nonce++;
        this.hash = this.computeHash();
      } else {
        break;
      }
    }
    console.log("挖矿结束", this.hash);
  }
}

// 区块 的 链
// 生成祖先区块
class Chain {
  constructor() {
    this.chain = [this.bigBang()];
    this.transactionPool = [];
    this.minerReward = 50;
    this.difficulty = 4;
  }

  bigBang() {
    const genesisBlock = new Block("我是祖先", "");
    return genesisBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // 添加transaction 到 transactionPool里
  addTransaction(transaction){
    this.transactionPool.push(transaction)
  }

  // 添加区块到区块链上
  addBlockToChain(newBlock) {
    // data
    // 找到最近一个block的hash
    // 这个hash就是新区块的previousHash
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.computeHash();
    newBlock.mine(this.difficulty);
    // 这个hash 需要满足一个区块链设置的条件
    this.chain.push(newBlock);
  }
  mineTransactionPool(minerRewardAddress) {
    // 发放矿工奖励
    const minerRewardTransaction = new Transaction(
      "",
      minerRewardAddress,
      this.minerReward
    );
    this.transactionPool.push(minerRewardTransaction);

    // 挖矿
    const newBlock = new Block(
      this.transactionPool,
      this.getLatestBlock().hash
    );
    newBlock.mine(this.difficulty)

    // 添加区块到区块链
    // 清空 transaction Pool
    this.chain.push(newBlock)
    this.transactionPool = []
  }

  //验证这个当前的区块链是否合法
  //当前的数据有没有被篡改
  //我们要验证区块的previousHash是否等于previous区块的hash
  validateChain() {
    if (this.chain.length === 1) {
      if (this.chain[0].hash !== this.chain[0].computeHash()) {
        return false;
      }
      return true;
    }
    // this.chain[1] 是第二个区块
    // 我们从第二个区块开始 验证
    // 验证到最后一个区块 this.chain.length -1
    for (let i = 1; i <= this.chain.length - 1; i++) {
      const blockToValidate = this.chain[i];
      //当前的数据有没有被篡改
      if (blockToValidate.hash !== blockToValidate.computeHash()) {
        console.log("数据篡改");
        return false;
      }
      //我们要验证区块的previousHash是否等于previous区块的hash
      const previousBlock = this.chain[i - 1];
      if (blockToValidate.previousHash !== previousBlock.hash) {
        console.log("前后区块链接断裂");
        return false;
      }
    }
    return true;
  }
}

const luotuoCoin = new Chain();
const t1 = new Transaction('addr1', 'addr2', 10)
const t2 = new Transaction('addr2', 'addr1', 5)
luotuoCoin.addTransaction(t1)
luotuoCoin.addTransaction(t2)

// console.log(luotuoCoin)
luotuoCoin.mineTransactionPool('addr3')
console.log(luotuoCoin)
console.log(luotuoCoin.chain[1])
console.log(luotuoCoin.chain[1].transactions)
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
