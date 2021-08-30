const express = require("express");
const app = express();

// 不关心请求路径和请求方法
// app.use((req, res, next) => {
//   console.log("Time", Date.now());
//   next();
// });

// 限定请求路径
// app.use("/user/:id", (req, res, next) => {
//   console.log("Reqest Type", req.method);
//   next();
// });

// 限定请求路径 + 请求方法
// app.get("/user/:id", (req, res, next) => {
//   res.send("USER");
// });

// 多个处理函数
// app.use(
//   "/user/:id",
//   (req, res, next) => {
//     console.log("Request Url", req.originalUrl);
//     next();
//   },
//   (req, res, next) => {
//     console.log("Reqest Type", req.method);
//     next();
//   }
// );

// 为同一个路径定义多个处理中间件
// app.get(
//   "/user/:id",
//   (req, res, next) => {
//     console.log("Id:", req.params.id);
//     if (req.params.id == 0) {
//       next("route");
//     } else {
//       next();
//     }
//   },
//   (req, res, next) => {
//     res.send("User Info");
//   }
// );
// app.get("/user/:id", (req, res, next) => {
//   res.end(req.params.id);
// });

// 重用中间件
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

app.listen(3000);
