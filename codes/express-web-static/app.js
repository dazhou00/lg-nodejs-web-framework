const express = require("express");
const path = require("path");

const app = express();

//
app.engine("html", require("express-art-template"));
app.set("view options", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// express 单独提供了一个内置中间件间：托管静态资源

// 访问的时候不要加前缀
// app.use(express.static("./public"));

// 加上访问前缀
// app.use("/public", express.static("./public"));
// app.use("/foo", express.static("./public"));

// 路径 最好时绝对路径
app.use(
  "/foo",
  express.static(path.join(__dirname, "./public"), {
    index: ["index.html"],
  })
);

// 托管多个静态资源目录
// // 资源托管顺序问题
// app.use("/node_module", express.static("./node_module"));
// app.use("/public", express.static("./public"));

app.use("/public", express.static("./public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
