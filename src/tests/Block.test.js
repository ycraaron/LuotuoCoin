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
const difficulty = 2;
const sha256 = require("crypto-js/sha256");
const previousHash = sha256("test");

test("should create a block with hash", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  const block = new Block([tx], previousHash);
  expect(block.hash.length).toBe(64);
  done();
});

test("should not mine because of transaction sig missing", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  const block = new Block([tx], previousHash);
  try {
    block.mine(difficulty);
  } catch (e) {
    expect(e.message).toBeDefined();
  }
  done();
});

test("should mine a hash start with difficulty digits number of 0", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  tx.sign(keyPairSender);
  const block = new Block([tx], previousHash);
  block.mine(difficulty);
  expect(block.hash.substring(0, difficulty)).toBe(
    new Array(difficulty + 1).join("0")
  );
  done();
});
