const express = require("express");

const app = express();

// 中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
});

app.get("/", (req, res) => {
  // console.log(`${req.method} ${req.url} ${Date.now()}`);
  // logger(req);
  res.send(`GET /`);
});

app.get("/about", (req, res) => {
  // console.log(`${req.method} ${req.url} ${Date.now()}`);
  // logger(req);
  res.send(`GET /about`);
});

app.post("/login", (req, res) => {
  // console.log(`${req.method} ${req.url} ${Date.now()}`);
  // logger(req);
  res.send(`POST /login`);
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});

// function logger(req) {
//   console.log(`${req.method} ${req.url} ${Date.now()}`);
// }
