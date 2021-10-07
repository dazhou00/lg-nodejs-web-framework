/**
 * 配置路由 -- 静态资源托管
 */

const Koa = require("koa");

const static = require("koa-static");
const path = require("path");
const mount = require("koa-mount");

const app = new Koa();

// app.use(static("./public"));
// app.use(static(path.join(__dirname, "./public")));

// 设置虚拟路径
app.use(mount("/foo", static(path.join(__dirname, "./public"))));

app.listen(3000);
