const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const app = express();

//
app.engine("html", require("express-art-template"));
app.set("view options", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/public/css/main.css", async (req, res) => {
  const data = await util.promisify(fs.readFile)("./public/css/main.css");
  res.end(data);
});

app.listen(3000);
