var express = require("express");
var app = express();

// 匹配到根路由 /
app.get("/", function (req, res) {
  res.send("root");
});

// 匹配到 /about
app.get("/about", function (req, res) {
  res.send("about");
});

// 配到 /random.text
app.get("/random.text", function (req, res) {
  res.send("random.text");
});

// 此路由路径将与acd和匹配abcd
app.get("/ab?cd", function (req, res) {
  res.send("ab?cd");
});

// 路径将会匹配abcd，abbcd，abbbcd，等等
app.get("/ab+cd", function (req, res) {
  res.send("ab+cd");
});

// 会匹配abcd，abxcd，abRANDOMcd，ab123cd，等
app.get("/ab*cd", function (req, res) {
  res.send("ab*cd");
});

// 将与 /abe和匹配 /abcde
app.get("/ab(cd)?e", function (req, res) {
  res.send("ab(cd)?e");
});

// 此路由路径将匹配其中带有“ a”的任何内容
app.get(/a/, function (req, res) {
  res.send("/a/");
});

// 匹配butterfly和dragonfly，但不butterflyman，dragonflyman等

app.get(/.*fly$/, function (req, res) {
  res.send("/.*fly$/");
});

app.listen(3000);
