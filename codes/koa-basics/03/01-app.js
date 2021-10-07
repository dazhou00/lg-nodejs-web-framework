/**
 * 配置路由 -- 原生路由
 */

const Koa = require("koa");

const app = new Koa();

app.use(ctx => {
  const path = ctx.path;
  if (path === "/") {
    ctx.body = "home page";
  } else if (path === "/foo") {
    ctx.body = "foo page";
  } else {
    ctx.body = "404 Not Found";
  }
});

app.listen(3000);
