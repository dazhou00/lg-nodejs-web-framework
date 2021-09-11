/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.engine("art", require("express-art-template")); // 当渲染 以 .art 结尾的资源文件的时候使用 express-art-template
app.set("view options", {
  // art-template 配置选项
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views")); // 模板文件的存储目录
app.set("view engine", "art");

const todos = [
  { id: 1, title: "任务一" },
  { id: 2, title: "任务二" },
  { id: 3, title: "任务三" },
  { id: 4, title: "任务四" },
];

app.get("/", (req, res) => {
  res.render("index", {
    foo: "foo",
    todos,
  });
});

app.listen(3000);
