/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  // 2 HTML 格式文本
  res.send("<h1>Hello Wrold!</h1>");
});

app.listen(3000);
