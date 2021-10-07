const http = require("http");

class Application {
  constructor() {
    this.middleware = []; // 保存用户添加的中间件函数
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
    return function () {
      const dispatch = index => {
        if (index >= middleware.length) return Promise.resolve();

        const fn = middleware[index];
        return Promise.resolve(
          // TODO: 上下文对象
          fn({}, () => dispatch(index + 1)) // next 函数
        );
      };
      // 返回 第一个 中间件处理函数
      return dispatch(0);
    };
  }

  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      fnMiddleware()
        .then(() => {
          console.log("end");
          res.end("Koa");
        })
        .catch(err => {
          res.end(err.message);
        });
    };
    return handleRequest;
  }
}

module.exports = Application;
