/**
 * express 渲染动态网页
 */

const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  // 4. 动态页面渲染
  const todos = [
    { id: 1, title: "任务一" },
    { id: 2, title: "任务二" },
    { id: 3, title: "任务三" },
    { id: 4, title: "任务四" },
  ];
  fs.readFile("./views/index2.html", "utf8", (err, data) => {
    if (err) return res.status(400).send("404 Not Find");

    let str = "";
    todos.forEach(todo => {
      str += `<li>${todo.title}</li>`;
    });

    const ret = data.replace("^_^", str);

    res.end(ret);
  });
});

app.listen(3000);
