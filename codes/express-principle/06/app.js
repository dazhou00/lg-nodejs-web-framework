/**
 * 提取 Layer 处理模块
 */

const express = require("./express");

const app = express();

app.get("/", (req, res) => {
  res.end("get /");
});

// app.get("/ab?cd", (req, res) => {
//   res.end("ab?cd");
// });
// app.get("/ab+cd", (req, res) => {
//   res.end("ab+cd");
// });
// app.get("/ab*cd", (req, res) => {
//   res.end("ab*cd");
// });

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.end("/users/:userId/books/:bookId");
});

// app.get("/ab(cd)?e", (req, res) => {
//   res.end("/ab(cd)?e");
// });

// app.get("/a/", (req, res) => {
//   res.end("/a/");
// });

// app.get("/.*fly$/", (req, res) => {
//   res.end("/.*fly$/");
// });

// app.get("/users/:userId/books/:bookId", (req, res) => {
//   res.end(req.params);
// });

app.listen(3000);
