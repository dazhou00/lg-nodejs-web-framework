/**
 * 配置路由 -- 路由重定向
 */

const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const path = require("path");
const mount = require("koa-mount");

const app = new Koa();

const router = new Router();

router.get("/foo", ctx => {
  ctx.body = "foo body";
});

router.get("/bar", ctx => {
  // 重定向针对的同步请求
  ctx.redirect("/foo");
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
