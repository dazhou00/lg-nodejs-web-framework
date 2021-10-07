/**
 * Koa 中错误处理
 * app.on('error') 处理
 */

const Koa = require("koa");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const app = new Koa();

// 在最外层添加异常捕获的中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error.message;
    ctx.app.emit("error", error, ctx);
  }
});

app.use(async (ctx, next) => {
  JSON.parse("{}");
  // ctx.body = "Hello Koa";
  // next() // 无法捕获后面的异步中间件
  // return next() // 可以捕获
  await next(); // 可以捕获
});

app.use(async ctx => {
  const data = await readFile(".dasdas/html");
  ctx.type = "html";
  ctx.body = data;
});

app.on("error", err => {
  console.log("app error", err);
});

app.listen(3000);
