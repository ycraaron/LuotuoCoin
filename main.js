// 区块链
// block
// chain

// data
// 之前区块的哈希值
// 自己的哈希值： 它是由存储在区块里的信息 算出来的 (data + 之前区块的哈希值)
const sha256 = require("crypto-js/sha256");

class Transaction {
  constructor(from, to, amount) {
    this.from = from
    this.to = to
    this.amount = amount
  }
}

class Block {
  constructor(transactions, previousHash, timestamp) {
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 1
    this.timestamp = timestamp
    this.hash = this.computeHash();
  }

  computeHash() {
    // TODO data 变成 array of obj 需要改
    return sha256(JSON.stringify(this.transactions) + this.previousHash + this.nonce + this.timestamp).toString();
  }

  getAnswer(difficulty) {
    //开头前n位为0的hash
    let answer = ''
    for(let i=0; i< difficulty;i++){
      answer+='0'
    }
    return answer
  }
  // 计算符合区块链难度要求的hash
  // 什么是符合区块链难度要求的hash
  mine(difficulty){
    while(true){
      this.hash=this.computeHash()
      if(this.hash.substring(0,difficulty)!== this.getAnswer(difficulty)){
        this.nonce++
        this.hash=this.computeHash()
      }else{
        break
      }
    }
    console.log('挖矿结束', this.hash)
  }
}

// 区块 的 链
// 生成祖先区块
class Chain {
  constructor() {
    this.chain = [this.bigBang()];
    // transactionPool
    // minerReward
    this.transactionPool = []
    this.minerRewardAmount = 50
    this.difficulty = 4;
  }

  bigBang() {
    const genesisBlock = new Block([], "", Date.now());
    return genesisBlock;
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // 现在的区块链是没有奖励机制的
  // 添加区块到区块链上的规则现在不一样了
  // 添加区块到区块链上
  // block size 是有限制的
  minePendingTransactions(minerRewardAddress) {
    // 矿工挖矿的时候 会把这个地址发送过来
    // 不需要new block了，因为new block 的所有信息都记载在链上
    let newBlock = new Block(this.transactionPool, this.getLatestBlock().hash, Date.now())
    newBlock.mine(this.difficulty)
    this.chain.push(newBlock)

    // 发放矿工奖励
    this.transactionPool = []
    const minerRewardTransaction = new Transaction('', minerRewardAddress, this.minerRewardAmount)
    console.log('矿工奖励', minerRewardTransaction)
    this.transactionPool.push(minerRewardTransaction)
    console.log(this.transactionPool)
  }

  addTransactionsToPool(transactions) {
    this.transactionPool = this.transactionPool.concat(transactions)
    console.log('added')
    console.log(this.transactionPool)
  }

  addBlockToChain(newBlock) {
    // data
    // 找到最近一个block的hash
    // 这个hash就是新区块的previousHash
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.computeHash();
    newBlock.mine(this.difficulty)
    // 这个hash 需要满足一个区块链设置的条件
    this.chain.push(newBlock)
    // 发放矿工奖励
  }

  //验证这个当前的区块链是否合法
  //当前的数据有没有被篡改
  //我们要验证区块的previousHash是否等于previous区块的hash
  validateChain(){
    if(this.chain.length===1){
      if(this.chain[0].hash !== this.chain[0].computeHash()){
        return false
      }
      return true
    }
    // this.chain[1] 是第二个区块
    // 我们从第二个区块开始 验证
    // 验证到最后一个区块 this.chain.length -1 
    for(let i = 1; i<= this.chain.length-1; i++){
      const blockToValidate = this.chain[i]
      //当前的数据有没有被篡改
      if(blockToValidate.hash!==blockToValidate.computeHash()){
        console.log('数据篡改')
        return false
      }
      //我们要验证区块的previousHash是否等于previous区块的hash
      const previousBlock = this.chain[i-1]
      if(blockToValidate.previousHash !== previousBlock.hash){
        console.log('前后区块链接断裂')
        return false
      }
    }
    return true
  }
}

const t1 = new Transaction('addr1', 'addr2', 10)
const t2 = new Transaction('addr2', 'addr3', 5)
const transactions = [t1, t2, t1]
// concat

// const block = new Block(transactions, '', Date.now())
// block的数据其实不是从外面创建的 而是从链上获取的
const blockChain = new Chain()
blockChain.addTransactionsToPool(transactions)
blockChain.minePendingTransactions('MinerAddress')
console.log(blockChain)
console.log(blockChain.chain[1])