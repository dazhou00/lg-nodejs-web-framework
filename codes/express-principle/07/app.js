/**
 * 实现顶层路由中间件功能
 */

const express = require("./express");

const app = express();

// app.get(
//   "/",
//   (req, res, next) => {
//     console.log("/ 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("/ 2");
//   },
//   (req, res, next) => {
//     console.log("/ 3");
//     next();
//   }
// );

app.get("/", (req, res) => {
  res.end("get /");
});

app.get("/foo", (req, res, next) => {
  console.log("foo 1");
  next();
});
app.get("/foo", (req, res, next) => {
  console.log("foo 2");
  setTimeout(() => {
    next();
  }, 1000);
});
app.get("/foo", (req, res, next) => {
  res.end("get /foo");
});
app.listen(3000);
