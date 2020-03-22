<p align="center">
  <a href="" rel="noopener">
 <img width=300 height=200 src="https://www.investcyprus.org.cy/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZVE9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--63169204734fc4159cf3c27c2c87146c82ad5b31/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lNTmpRd2VEUTRNQVk2QmtWVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--4521a24c165de33d1b452a4a2b25f793dc0ec8ca/blockchain.jpg" alt="Project logo"></a>
</p>

<h3 align="center">LuotuoCoin</h3>

<div align="center">

  [![GitHub Issues](https://img.shields.io/github/issues/ycraaron/LuotuoCoin.svg)](https://github.com/ycraaron/LuotuoCoin/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ycraaron/LuotuoCoin.svg)](https://github.com/ycraaron/LuotuoCoin/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

*⚠️ 本项目仅作为了解区块链及区块链入门教学使用 For educational purpose only*

## Coverage (Jest)
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |   96.15 |    88.46 |     100 |   96.05 |                   
 blockChain.js |   96.15 |    88.46 |     100 |   96.05 | 76,133,168        

## 功能(Features)

* 工作量证明机制(Proof of Work, PoF)的简单实现, A simple implementation of the Proof of Work algorithm.
* 区块链的验证, Block chain validation to prevent it from being maliciously tampered.
* Transaction的签名. Sign transactions.
* 钱包地址生成. Wallet generation.
* 挖矿. Mining

## 🦊 开始 Let's get started <a name = "getting_started"></a>
祝学习愉快。
Happy Learning.

### 安装依赖(Install dependencies)
```
npm install --save
或者
yarn
```

### 生成一个密钥对(Generate your wallet)
密钥对讲用于发起转账，公钥（public key）会用作你的钱包地址，私钥（private key）会用来生成转账的数字签名。
The keypair will be used for signing transactions(private key) and receving miner rewards/transactions, public key will be your wallet address.
```js
const ecLib = require('elliptic').ec;
const ec = new ecLib('secp256k1') // curve name
const sha256 = require('crypto-js/sha256')
// 生成我们的密钥对 generate the keypair
const key = ec.genKeyPair();
// 拿到我们的私钥和公钥 希望拿到hex string格式的
console.log('private', key.getPrivate('hex'))
console.log('public', key.getPublic('hex'))
```

### 创建区块链(Create Blockchain)

```js
const { chain, transaction } = require('./blockChain');
const myCoin = new chain();
```

### 发起转账(Create Transaction)
利用上述步骤生成的**keypair object**, use the **keypair object** generated above
```js
// 发起一笔转给to 10块钱的交易
// create a transaction that transfer 10 coin to address 'to'
const transaction = new Transaction(key.getPublic('hex'), 'to', 10);
transaction.sign(key);
myCoin.addTransaction(transaction);
```

### 挖矿(Mine)
同样需要利用之前生成的key object，将公钥作为参数传入挖矿的方法，如果你最后挖矿成功，区块链会向这个地址发放一个矿工奖励。
Using the same keypair object, passin the public key to receive the minder reward.
```js
myCoin.mineTransactionPool(key.getPublic('hex'));
```

---
## 📽 视频教程(Video tutorial)
本项目均可在b站找到视频教程 [我的B站区块链视频](https://space.bilibili.com/43276908/video?keyword=%E5%8C%BA%E5%9D%97%E9%93%BE). 第一列视频均为理论讲解，第二列视频均为代码实现。

| 视频1-1: 区块链概念讲解 | 视频1-2: 简单区块链的实现 |
:-------------------------:|:-------------------------:
[![](https://i1.hdslb.com/bfs/archive/45e93b8158da8a8e9cac011d3b3b96898ba32d4e.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av75077145) | [![](https://i2.hdslb.com/bfs/archive/923220116b7587df8d995e27b2db096fd3c2984a.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av78391502)
| 视频2-1: 工作量证明机制(pow)概念讲解 | 视频2-2: 整合Proof of Work到区块链 |
[![](https://i2.hdslb.com/bfs/archive/ba4a0629d07ccc986e00f0a02e38382fc3d7790b.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av75755443) | [![](https://i2.hdslb.com/bfs/archive/e23df57e813a458c347edbc06df66157e30d931a.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av80091680)
| 视频3-1: 数字货币是怎么产生的 | 视频3-2: 把区块链变成数字货币 |
[![](https://i2.hdslb.com/bfs/archive/e2810bd35fd43d5e6285703a9ac92893ab67cb5c.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av87698079) | [![](https://i0.hdslb.com/bfs/archive/b74ad2337cfd2042bc8bf3c8d8f9cf8f2972b897.jpg@380w_240h_100Q_1c.webp)](https://www.bilibili.com/video/av88477333)
| 视频4-1: 比特币中的数字签名是什么 | 视频4-2: 向区块链中添加数字签名 |
[![](https://i2.hdslb.com/bfs/archive/90c6b534c8334136f0f21407861d1e3faaf86cb4.jpg_320x200.jpg)](https://www.bilibili.com/video/av97462177/) | [![](https://i0.hdslb.com/bfs/archive/114e8bc5d21bced334a4d0662544a6c9974d4903.jpg_320x200.jpg?version=7e13c48b1154f692dbb30016db96c21e)](https://www.bilibili.com/video/av98365204/)
