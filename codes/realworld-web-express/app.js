const express = require("express");
const morgan = require("morgan");
const router = require("./router");
const errorHandler = require("errorhandler");
const path = require("path");
const session = require("express-session");
const { sessionSecret, dbUri } = require("./config/config.default");
const MongoStore = require("connect-mongo");
const moggoose = require("mongoose");

require("./model");

const app = express();

// 使用 session 中间件
app.use(
  session({
    secret: sessionSecret, // 签发 session id 的密钥
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 保存 session id 的 cookie 设置
      maxAge: 1000 * 60 * 60 * 24, // 过期时间 单位毫秒
      // secure: true, // 只有 HTTPS 协作才会收发 cookie
    },
    store: MongoStore.create({
      mongoUrl: dbUri,
    }), // 将数据持久化到 MongoDB 数据库中
  })
);

// 确保挂载到 session 初始化配置后
app.use((req, res, next) => {
  // 统一给模板添加数据
  app.locals.sessionUser = req.session.user;
  next();
});

// 静态资源托管
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "./node_modules"))
);

// 配置模板引擎
app.engine("html", require("express-art-template"));
app.set("view options", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// 挂在路由
app.use(router);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
