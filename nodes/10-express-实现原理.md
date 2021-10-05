# express 实现原理

## express 源码

- ES5 写的
- 异步控制采用回调方式
- 源码结构目录

```powershell
.
├── index.js # 入口模块
├── lib
│   ├── application.js # app 模块
│   ├── express.js # 组织导出模块
│   ├── middleware # 内置中间件
│   │   ├── init.js
│   │   └── query.js
│   ├── request.js # 扩展 req 对象
│   ├── response.js # 扩展 res 对象
│   ├── router # 路由系统
│   │   ├── index.js
│   │   ├── layer.js
│   │   └── route.js
│   ├── utils.js # 工具方法
│   └── view.js # 模板引擎处理
└── package.json
```

## 中间件配置

- 我们配置的中间件会从上到下进行匹配
- 如果找不到发送响应的中间件默认执行 404 功能

## 底层：http 模块

express 框架建立在 node.js 内置的 http 模块上。http 模块生成服务器的原始代码如下

```js
var http = require('http')

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"})
  response.end('Hello world)
})

app.listen(3000, 'localhost')
```

上面的代码的关键是 http 模块的 createServer 方法，表示生成一个 HTTP 服务器实例。该方法接受一个回调函数，该回调函数的参数，分别为代表 HTTP 请求 和 HTTP 响应 的 request 对象 和 response 对象

express 框架的核心是对 http 模块的 再包装

```js
var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello world!");
});
```

比较两段代码，可以看到它们非常接近。原来是用 http.createServer 方法新建一个 app 实例，现在则是用 Express 的构造方法，生成一个 Epress 实例。两者的回调函数都是相同的。Express 框架等于在 http 模块之上，加了一个中间层。

## 基本实现

```js
const express = require("./express");

const app = express();

app.get("/", (req, res) => {
  res.end("get /");
});

app.get("/about", (req, res) => {
  res.end("get /about");
});

app.listen(3000);
```

## 抽取 Application 模块

- 抽离 application.js

```js
const http = require("http");
const url = require("url");

function App() {
  this.routes = [];
}

App.prototype.get = function (path, handler) {
  this.routes.push({
    path,
    method: "get",
    handler,
  });
};

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const method = req.method.toLowerCase();
    const route = this.routes.find(
      route => route.path === pathname && route.method === method
    );
    if (route) return route.handler(req, res);

    res.end("404 Not Found.");
  });
  server.listen(...args);
};

module.exports = App;
```

- express.js

```js
const App = require("./application");

function createApplication() {
  const app = new App();
  return app;
}

module.exports = createApplication;
```

## 应用和路由的分离

- application.js

```js
const http = require("http");
const Router = require("./router");

function App() {
  this._router = new Router();
}

App.prototype.get = function (path, handler) {
  this._router.get(path, handler);
};

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res);
  });
  server.listen(...args);
};

module.exports = App;
```

- router/index.js

```js
const url = require("url");

function Router() {
  this.stack = [];
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    method: "get",
    handler,
  });
};

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();
  const route = this.stack.find(
    route => route.path === pathname && route.method === method
  );
  if (route) return route.handler(req, res);

  res.end("404 Not Found.");
};

module.exports = Router;
```

## 处理不同的请求方法

## 处理不同的请求路径

- path-to-regexp@0.1.7

```js
const url = require("url");
const methods = require("methods");
const pathToRegexp = require("path-to-regexp");

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();

  const route = this.stack.find(route => {
    const keys = [];
    const regexp = pathToRegexp(route.path, keys, {});
    const match = regexp.exec(pathname);
    if (match) {
      req.params = req.params || {};
      keys.forEach((key, index) => {
        req.params[key.name] = decodeURIComponent(match[index + 1]);
      });
    }
    return match && route.method === method;
  });
  if (route) return route.handler(req, res);

  res.end("404 Not Found.");
};
```

## 提取 Layer 处理模块

- /lib/router/layer.js

```js
const pathRegexp = require("path-to-regexp");

function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
  this.keys = [];
  this.regexp = pathRegexp(path, this.keys, {});
  this.params = {};
}

Layer.prototype.match = function (pathname) {
  const match = this.regexp.exec(pathname);
  if (match) {
    this.keys.forEach((key, index) => {
      this.params[key.name] = match[index + 1];
    });
    return true;
  }
  return false;
};

module.exports = Layer;
```

- lib/router/index.js

```js
const url = require("url");
const methods = require("methods");
const Layer = require("./layer");

function Router() {
  this.stack = [];
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handler) {
    const layer = new Layer(path, handler);
    layer.method = method;
    this.stack.push(layer);
  };
});

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();

  const route = this.stack.find(layer => {
    const match = layer.match(pathname);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }

    return match && layer.method === method;
  });

  if (route) return route.handler(req, res);

  res.end("404 Not Found.");
};

module.exports = Router;
```

## 实现路由中间件功能

```js
Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();

  let index = 0;
  const next = () => {
    if (index >= this.stack.length) return res.end(`Can not get ${pathname}`);
    const layer = this.stack[index++];
    const match = layer.match(pathname);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }

    if (match && layer.method === method) {
      return layer.handler(req, res, next);
    }
    next();
  };

  next();
};
```

### 实现多个处理函数的路由中间件

## 实现 use 方法
