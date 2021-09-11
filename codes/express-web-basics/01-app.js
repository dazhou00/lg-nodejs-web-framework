/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  // 1. 普通文本
  res.send("Hello World!");
});

app.listen(3000);
