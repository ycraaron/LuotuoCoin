const ecLib = require('elliptic').ec;
const ec = new ecLib('secp256k1') // curve name
const { Transaction, Chain, Block } = require("./blockChain-old");


const luotuoCoin = new Chain(3);
const keyPairSender = ec.genKeyPair();
const privateKeySender = keyPairSender.getPrivate('hex')
const publicKeySender = keyPairSender.getPublic('hex')

const keyPairReceiver = ec.genKeyPair();
const privateKeyReceiver = keyPairReceiver.getPrivate('hex')
const publicKeyReceiver = keyPairReceiver.getPublic('hex')

const t1 = new Transaction(publicKeySender, publicKeyReceiver, 10);
t1.sign(ec.keyFromPrivate(privateKeySender))
console.log(t1)
// t1.amount=20
// const t2 = new Transaction("addr2", "addr1", 5);
luotuoCoin.addTransaction(t1);
// luotuoCoin.addTransaction(t2);

// console.log(luotuoCoin)
luotuoCoin.mineTransactionPool("addr3");
console.log(luotuoCoin.validateChain())
console.log(luotuoCoin)
console.log(luotuoCoin.chain[1])