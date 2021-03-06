/**
 * 了解 express 的源码目录结构
 * 基本实现
 */

const express = require("./express");

const app = express();

app.get("/", (req, res) => {
  res.end("get /");
});

app.get("/about", (req, res) => {
  res.end("get /about");
});

app.listen(3000);
