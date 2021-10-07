/**
 * 中间件
 */

const Koa = require("koa");
const util = require("util");
const fs = require("fs");

const app = new Koa();

app.use(async (ctx, next) => {
  const data = await util.promisify(fs.readFile)("./views/index.html");
  ctx.type = "html";
  ctx.body = data;
});

app.listen(3000);
