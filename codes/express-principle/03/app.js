/**
 * 应用和路由的分离
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
