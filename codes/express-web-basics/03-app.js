/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  // 3. 为了方便维护，把文本内容放到单独文件
  fs.readFile("./views/index.html", (err, data) => {
    if (err) return res.status(404).send("404 Not Found.");
    res.end(data);
  });
});

app.listen(3000);
