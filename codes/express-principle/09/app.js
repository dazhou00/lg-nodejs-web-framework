/**
 * 实现 use 方法中间件
 */

const express = require("./express");

const app = express();

//  不验证请求方法和请求路径
// app.use(function (req, res, next) {
//   res.end("hello");
// });

// 匹配 /foo 开头
// app.use("/foo", function (req, res, next) {
//   res.end("foo");
// });

// app.use("/", function (req, res, next) {
//   res.end("/ hello");
// });

app.use(
  "/foo",
  function (req, res, next) {
    console.log(1);
    next();
  },
  function (req, res, next) {
    console.log(2);
    next();
  },
  function (req, res, next) {
    res.end("/ foo");
  }
);

app.listen(3000);
