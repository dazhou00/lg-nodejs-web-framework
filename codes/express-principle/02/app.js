/**
 * 抽取 Application 模块
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
