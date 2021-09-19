const mongoose = require("mongoose");
const { dbUri } = require("../config/config.default");

// 链接 MongoDB  数据库
mongoose.connect(dbUri);

const db = mongoose.connection;

// 当链接失败的时候
db.on("error", (err) => {
  console.log("MongoDB 数据库连接失败", err);
});

// 当连接成功
db.once("open", () => {
  console.log("MongoDB 数据库连接成功");
});

// 组织导出模型
module.exports = {
  User: mongoose.model("User", require("./user")),
  Article: mongoose.model("Article", require("./article")),
};
