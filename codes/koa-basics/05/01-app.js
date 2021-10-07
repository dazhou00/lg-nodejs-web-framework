/**
 * Koa 中错误处理
 * ctx.throw()
 */

const Koa = require("koa");
const app = new Koa();

app.use(ctx => {
  try {
    JSON.parse("dasdasda");
    ctx.body = "Hello Koa";
  } catch (error) {
    // ctx.response.status = 500;
    // ctx.response.body = "服务端内部错误";

    ctx.throw(500);
    // ctx.throw(404)
  }
});

app.listen(3000);
