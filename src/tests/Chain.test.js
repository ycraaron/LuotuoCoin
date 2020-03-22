const { Chain, Transaction, Block } = require("../blockChain");

const ecLib = require("elliptic").ec;
const ec = new ecLib("secp256k1");
const keyPairSender = ec.genKeyPair();
const privateKeySender = keyPairSender.getPrivate("hex");
const publicKeySender = keyPairSender.getPublic("hex");
const keyPairReceiver = ec.genKeyPair();
const privateKeyReceiver = keyPairReceiver.getPrivate("hex");
const publicKeyReceiver = keyPairReceiver.getPublic("hex");
const amount = 10;
const difficulty = 1;
const sha256 = require("crypto-js/sha256");
const previousHash = sha256("test");

test("should create a chain with genesis block", done => {
  const chain = new Chain(difficulty);
  expect(chain.chain.length).toBe(1);
  done();
});

test("should set the difficulty", done => {
  const chain = new Chain(difficulty);
  chain.setDifficulty(3);
  expect(chain.difficulty).toBe(3);
  done();
});

test("should not add transaction because of missing from", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(null, publicKeyReceiver, amount);
  try {
    chain.addTransaction(tx);
  } catch (e) {
    expect(e.message).toBeDefined();
  }
  done();
});
test("should not add transaction because of missing to", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, null, amount);
  try {
    chain.addTransaction(tx);
  } catch (e) {
    expect(e.message).toBeDefined();
  }
  done();
});
test("should not add transaction because of missing sig", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  try {
    chain.addTransaction(tx);
  } catch (e) {
    expect(e.message).toBeDefined();
  }
  done();
});

test("should add transaction", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  expect(chain.transactionPool.length).toBe(1);
  done();
});

test("should add block", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  chain.mineTransactionPool(publicKeySender);
  expect(chain.chain.length).toBe(2);
  done();
});

test("chain should be valid", done => {
  const chain = new Chain(difficulty);
  chain.validateChain();
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  chain.mineTransactionPool(publicKeySender);
  expect(chain.validateChain()).toBe(true);
  done();
});

test("chain should be invalid due to transaction validation fail", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  chain.mineTransactionPool(publicKeySender);
  chain.chain[1].transactions[0].amount = 20;

  expect(chain.validateChain()).toBe(false);
  done();
});
test("chain should be invalid due to tampered data", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  chain.mineTransactionPool(publicKeySender);
  chain.chain[1].timestamp = Date.now();
  expect(chain.validateChain()).toBe(false);
  done();
});
test("chain should be invalid due to broken blockchain", done => {
  const chain = new Chain(difficulty);
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  chain.addTransaction(tx);
  chain.mineTransactionPool(publicKeySender);
  chain.chain[0].timestamp = Date.now();
  chain.chain[0].hash = chain.chain[0].computeHash();
  expect(chain.validateChain()).toBe(false);
  done();
});
