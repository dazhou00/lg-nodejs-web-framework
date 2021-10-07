# Koa 实现原理

## 源码目录结构

```powershell
.
├── History.md
├── LICENSE
├── Readme.md
├── dist
│   └── koa.mjs
├── lib
│   ├── application.js  # 最核心的模块
│   ├── context.js # 上下文对象
│   ├── request.js # Koa 自己实现的请求对象
│   └── response.js # Koa 自己实现的响应对象
└── package.json
```

## 基本结构

- 使用

```js
const Koa = require("./koa");

const app = new Koa();

app.listen(3000);
```

- application.js

```js
const http = require("http");

class Application {
  listen(...args) {
    const server = http.createServer((req, res) => {
      res.end("Koa");
    });
    server.listen(...args);
  }
}

module.exports = Application;
```

## 实现中间件功能

- Koa 会把所有中间件组合成一个大的 Promise
- 当这个 Promise 执行完毕之后，会采用当前的 ctx.body 进行结果响应
- next 前面必须有 await 或者 return next，否则执行顺序达不到预期
- 如果都是同步执行，加不加 await 都无所谓
- 我不知道后续是否有异步逻辑，所以建议写的时候都加上 await next

### 收集中间件

```js
const http = require("http");

class Application {
  constructor() {
    this.middleware = []; // 保存用户添加的中间件函数
  }
  listen(...args) {
    const server = http.createServer((req, res) => {
      res.end("Koa");
    });
    server.listen(...args);
  }
  // 收集中间件
  use(fn) {
    if (typeof fn != "function")
      throw new TypeError("middleware must be a function!");
    this.middleware.push(fn);
  }
}

module.exports = Application;
```

### 调用中间件

```js
  listen(...args) {
      const server = http.createServer(this.callback());
      server.listen(...args);
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
```
