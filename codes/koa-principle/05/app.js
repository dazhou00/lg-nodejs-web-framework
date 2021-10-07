/**
 * Context
 */

const Koa = require("./koa");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.body = "Hello Koa"

  // ctx.body = 123

  // const data = await readFile('./package.json')
  // ctx.body = data

  ctx.body = fs.createReadStream('./package.json')
});

// app.use((ctx, next) => {
//   ctx.body = "Hello Koa";
//   // ctx.response.body = 'Hello Koa'
//   next()

//   ctx.body = 'Hello Koa 3'
// });

// app.use((ctx, next) => {

//   console.log(ctx.response.body, ctx.body);
//   ctx.body = "Hello Koa 2";
// });

app.listen(3000);
