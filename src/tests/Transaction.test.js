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

test("should create a transaction", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.from).toBe(publicKeySender);
  expect(tx.to).toBe(publicKeyReceiver);
  done();
});

test("should return 64bit hash", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.computeHash().length).toBe(64)
  done();
});

test("should generate signature", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.signature).toBe(undefined)
  tx.sign(keyPairSender)
  expect(tx.signature).toBeDefined()
  done();
});

test("signature should be valid", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.signature).toBe(undefined)
  tx.sign(keyPairSender)
  expect(tx.signature).toBeDefined()
  expect(tx.isValid()).toBe(true)
  done();
});

test("signature should be inValid after tampering", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.signature).toBe(undefined)
  tx.sign(keyPairSender)
  expect(tx.signature).toBeDefined()
  tx.amount = 20
  expect(tx.isValid()).toBe(false)
  done();
});

test("signature is missing, should throw error", done => {
  const tx = new Transaction(publicKeySender, publicKeyReceiver, amount);
  expect(tx.signature).toBe(undefined)
  expect(tx.isValid).toThrow(Error)
  done();
});

test("reward transaction, should be valid", done => {
  const tx = new Transaction(null, publicKeyReceiver, amount);
  expect(tx.signature).toBe(undefined)
  expect(tx.isValid()).toBe(true)
  done();
});
