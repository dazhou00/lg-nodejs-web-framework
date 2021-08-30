# 中间件

## 了解什么是中间件

- 需求：打印请求日志（输出每个请求的 `请求方法+请求路径+请求时间`）
```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`GET /`);
});

app.get("/about", (req, res) => {
  res.send(`GET /about`);
});

app.post("/login", (req, res) => {
  res.send(`POST /login`);
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
```

- 简单实现
```js
app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  res.send(`GET /`);
});

app.get("/about", (req, res) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  res.send(`GET /about`);
});

app.post("/login", (req, res) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  res.send(`POST /login`);
});
```

- 封装回调代码
```js
function logger(req) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
}


app.get("/", (req, res) => {
  logger(req);
  res.send(`GET /`);
});

app.get("/about", (req, res) => {
  logger(req);
  res.send(`GET /about`);
});

app.post("/login", (req, res) => {
  logger(req);
  res.send(`POST /login`);
});

```

**如果路由非常的多，在每个请求路由函数中都手动调用一遍太麻烦**

- 使用中间件实现
```js

// 中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
});


app.get("/", (req, res) => {
  res.send(`GET /`);
});

app.get("/about", (req, res) => {
  res.send(`GET /about`);
});

app.post("/login", (req, res) => {
  res.send(`POST /login`);
});
```

## 概念

Express 中间件和 AOP 面向切面编程就是一个意思，就是都需要经过经过的一些步骤，不去修改自己的代码，以此来扩展或者处理一些功能


AOP（Aspect Oriented Programming）面向切面编程：
- 将日志记录，性能统计，安全控制，事务处理，异常处理等代码从业务逻辑代码中划分出来，通过对这些行为的分离，我们希望可以将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务逻辑的代码。
- 利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率和可维护性。

**就是在现有代码程序中，在程序生命周期或者横向流程中 加入/减去 一个或多个功能，不影响原有功能**


## express 中的中间件

中间件就是一个可以访问请求对象、响应对象和调用 next 方法的一个函数

```js
const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  next()
});

app.listen(3000);
```

在中间件函数中可以执行以下任务：
- 执行任何代码
- 修改 request 或者 response 响应对象
- 结束请求响应周期
- 调用下一个中间件

> 如果当前中间件功能没有结束请求(响应周期)，则必须调用 next() 将 控制权传递给下一个中间件功能，否则请求将被挂起


## 分类

在 express 中 应用程序可以使用以下类型的中间件
- 应用程序级别中间件
- 路由级别中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件


### 应用程序级别中间件

#### 不考虑请求路径和请求方法

```js
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});
```

#### 限定请求路径

```js
app.use("/user/:id", (req, res, next) => {
  console.log("Reqest Type", req.method);
  next();
});
```

#### 限定请求路径和请求方法

```js
app.get("/user/:id", (req, res, next) => {
  res.send("USER");
});
```

#### 多个处理函数

```js
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request Url", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Reqest Type", req.method);
    next();
  }
);
```

#### 为同一个路径定义多个中间件

```js
app.get(
  "/user/:id",
  (req, res, next) => {
    console.log("Id:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("User Info");
  }
);
app.get("/user/:id", (req, res, next) => {
  res.end(req.params.id);
});
```

要从路由中间件堆栈中跳过其余中间件功能，需要调用 `next('route')` 将控制权传递给下一条路由
> `next('route')` 仅在使用 app.METHOD() 或 router.METHOD()函数加载的中间件函数中才有效

```js
app.get(
  "/user/:id",
  (req, res, next) => {
    console.log("Id:", req.params.id);
    if (req.params.id == 0) {
      next("route");
    } else {
      next();
    }
  },
  (req, res, next) => {
    res.send("User Info");
  }
);
app.get("/user/:id", (req, res, next) => {
  res.end(req.params.id);
});
```

#### 重用中间件

- 中间件可以在数组中声明为重用
```js
function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});
```


### 路由器级中间件

路由器级中间件需要绑定到 `express.Router()` 实例上
```js
const router = express.Router()
```
使用 router.use() 和 router.METHOD() 函数加载路由器级中间件


- 通过使用路由器级中间件来复制上面显示的用于应用程序级中间件的中间件系统
```js
var express = require('express')
var app = express()
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

> 要跳过路由器的其余中间件功能，请调用next('router') 将控制权转回路由器实例。

- 显示了一个中间件子堆栈，该子堆栈处理对/user/:id路径的GET请求
```js
var express = require('express')
var app = express()
var router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})
```



### 错误处理中间件

以与其他中间件函数相同的方式定义错误处理中间件函数，除了使用四个参数而不是三个参数（特别是使用签名(err, req, res, next)）之外:

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

**错误处理中间件始终带有四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。即使不需要使用该 next 对象，也必须指定它以维护签名。否则，该 next 对象将被解释为常规中间件，并且将无法处理错误。**

如果将任何内容传递给该next()函数（字符串除外'route'），Express都会将当前请求视为错误，并且将跳过所有剩余的非错误处理路由和中间件函数。

### 处理404

在所有路由中间件最后添加下面中间件，没有被路由匹配到的请求都将进入这里

```js
app.use((req, res, next) => {
	res.status(404).send('404 Not Found.')
})
```

### 内置中间件

- [express.json()](http://expressjs.com/en/4x/api.html#express.json) 解析 Content-Type 为 application/json 格式的请求体
- [express.urlencoded()](http://expressjs.com/en/4x/api.html#express.urlencoded) 解析 Content-Type 为 application/x-www-form-urlencoded 格式的请求体
- [express.raw()](http://expressjs.com/en/4x/api.html#express.raw) 解析 Content-Type 为 application/octet-stream 格式的请求体
- [express.text()](http://expressjs.com/en/4x/api.html#express.text) 解析 Content-Type 为 text/plain 格式的请求体
- [express.static()](http://expressjs.com/en/4x/api.html#express.static) 托管静态资源文件

### 第三方中间件
早期的 Express 内置了很多中间件。后来 Express 在 4.x 之后移除了这些内置中间件，官方把这些功能性中间件以包的形式单独提供出来。这样做的目的是为了保持 Express 本身极简灵活的特性，开发人员可以根据自己的需要去灵活的使用。

有关Express常用的[第三方中间件](http://expressjs.com/en/resources/middleware.html)功能的部分列表。