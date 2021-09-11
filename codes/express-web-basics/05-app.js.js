/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");
const template = require("art-template");

const app = express();

const todos = [
  { id: 1, title: "任务一" },
  { id: 2, title: "任务二" },
  { id: 3, title: "任务三" },
  { id: 4, title: "任务四" },
];

app.get("/", (req, res) => {
  // 5.使用模板引擎
  fs.readFile("./views/index3.html", "utf8", (err, templateStr) => {
    if (err) return res.status(404).send("404 Not Found");

    const ret = template.render(templateStr, {
      foo: "bar",
      todos,
    });
    res.end(ret);
  });
});

app.listen(3000);
