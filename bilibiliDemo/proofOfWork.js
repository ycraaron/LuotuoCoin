const sha256 = require("crypto-js/sha256");

console.log(sha256("luotuo1").toString());
console.log(sha256("luotuo2").toString());

// 对于不同的输入，哪怕只是一个很微小的改动，输出的结果都是很不一样的。
// 对于同一个输入，输出结果是一样的。

// 我现在需要得到 一个 开头值为0的哈希值。请告诉我X是多少
// 我现在需要得到 一个 开头值前4位全为0的哈希值。请告诉我X是多少

function proofOfWork() {
  let data = "luotuo";
  let x = 1;
  while (true) {
    if (
      sha256(data + x)
        .toString()
        // 可以通过调整字符串长度来控制难度，自己可以试一下。
        // 也可以用自己喜欢的语言，来实现这个函数。
        // 这个函数真的不复杂。
        .substring(0, 1) !== "0"
    ) {
      x = x + 1;
    } else {
      console.log(sha256(data + x).toString());
      console.log(x);
      break;
    }
  }
}
proofOfWork();
