/**
 * 配置路由 -- kao-router模块
 */

const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();

const router = new Router();

router.get("/", ctx => {
  ctx.body = "home page";
});
router.post("/", ctx => {
  ctx.body = "post /";
});
router.get("/foo", ctx => {
  ctx.body = "foo page";
});
router.get("/users/:id", ctx => {
  console.log(ctx.params);
  ctx.body = "users page";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
