const http = require("http");
const { Stream } = require("stream");
const context = require("./context");
const request = require("./request");
const response = require("./response");
const { body } = require('./response')

class Application {
  constructor() {
    this.middleware = []; // 保存用户添加的中间件函数

    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
  // 收集中间件
  use(fn) {
    if (typeof fn != "function")
      throw new TypeError("middleware must be a function!");
    this.middleware.push(fn);
  }
  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function (context) {
      const dispatch = index => {
        if (index >= middleware.length) return Promise.resolve();

        const fn = middleware[index];
        return Promise.resolve(
          fn(context, () => dispatch(index + 1)) // next 函数
        );
      };
      // 返回 第一个 中间件处理函数
      return dispatch(0);
    };
  }

  // 构造上下文对象
  createContext(req, res) {
    // 为了避免请求之间 context 数据交叉污染，这里为每个请求单独创建 context 请求对象
    const context = Object.create(this.context)
    const request = (context.request = Object.create(this.request))
    const response = (context.response = Object.create(this.response))

    context.app = request.app = response.app = this
    context.req = request.req = response.req = req // 原生的请求对象
    context.res = request.res = response.res = res // 原生的响应对象
    request.ctx = response.ctx = context // 在 Request 和 Response 中也可以拿到 context 上下文对象
    request.response = response // Request 中也可以拿到 Response
    response.request = request // Response 中也可以拿到 Request
    context.originalUrl = request.originalUrl = req.url // 没有经过任何处理的请求路径
    context.state = {} // 初始化 state 数据对象，用于给模板视图提供数据

    return context
  }

  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      // 每个请求都会创建一个独立 Context 上下文对象，她们之间不会互相污染
      const context = this.createContext(req, res);
      fnMiddleware(context)
        .then(() => {
          respond(context)
        })
        .catch(err => {
          res.end(err.message);
        });
    };
    return handleRequest;
  }
}

function respond(ctx) {
  const body = ctx.body
  const res = ctx.res

  if (body === null) {
    res.statusCode = 204
    return res.end()
  }

  if (typeof body == 'string') return res.end(body)
  if (Buffer.isBuffer(body)) return res.end(body)
  if (body instanceof Stream) return body.pipe(ctx.res)
  if (typeof body === 'number') return res.end(body + '')
  if (typeof body === 'object') {
    const jsonStr = JSON.stringify(body)
    return res.end(jsonStr)
  }
}

module.exports = Application;
