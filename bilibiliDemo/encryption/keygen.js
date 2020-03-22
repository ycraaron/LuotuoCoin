const ecLib = require('elliptic').ec;
const ec = new ecLib('secp256k1') // curve name
const sha256 = require('crypto-js/sha256')

// 生成我们的密钥对
const key = ec.genKeyPair();
// 拿到我们的私钥和公钥 希望拿到hex string格式的
console.log('private', key.getPrivate('hex'))
console.log('public', key.getPublic('hex'))
const doc = "zhuanzhang20yuan"
const hashedDoc = sha256(doc).toString()
const hexSignature = key.sign(hashedDoc, 'base64').toDER('hex')

console.log('hashed doc', hashedDoc)
console.log('signature', hexSignature)
// 收到签名的一方
const publicKey = ec.keyFromPublic(key.getPublic('hex'), 'hex')
console.log(publicKey.verify(hashedDoc , hexSignature))

// tamper 篡改
const tamperedDoc = 'zhuanzhang10yuan'
const hashedTamperedDoc = sha256(tamperedDoc).toString()
// console.log('tampered hased doc', hashedTamperedDoc)
console.log(publicKey.verify(hashedTamperedDoc, hexSignature))

