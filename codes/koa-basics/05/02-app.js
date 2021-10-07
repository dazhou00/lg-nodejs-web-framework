/**
 * Koa 中错误处理
 * 全局异常处理
 */

const Koa = require("koa");

const app = new Koa();

// 在最外层添加异常捕获的中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = "服务端内部错误";
  }
});

app.use(async (ctx, next) => {
  JSON.parse("cfdsfgasdg");
  ctx.body = "Hello Koa";
});

app.listen(3000);
