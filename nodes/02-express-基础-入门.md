# Express 入门

## 创建项目基本结构

```powershell
# 创建项目文件夹
mkdir express-basics

# 进入目录
cd express-basics

# 初始化
npm init -y

# 安装 express
npm install express

# 创建入口文件
touch app.js
```

- app.js
```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
})
```

## 路由基础

[路由指南](http://expressjs.com/en/guide/routing.html)

- 路由是指确定应用程序如何响应客户端对特定端点的请求
- 该特定端点是URI（或路径）和特定的HTTP请求方法（GET，POST等）。
- 每个路由可以具有一个或多个处理程序函数，这些函数在匹配该路由时执行

路由定义采用以下结构：
```js
app.METHOD(PATH, HANDLER)
```
- app 是 Express 实例-
- METHOD 是小写的 HTTP 请求方法
- PATH 是服务器上的路径
- HANDLER 是当路由匹配时执行的功能

响应根路径的 GET 请求：
```js
app.get('/', (req, res) => {
  res.send('响应根路径的 GET 请求')
})
```

响应根路径的 POST 请求：
```js
app.post('/', (req, res) => {
  res.send('响应根路径 POST 请求')
})
```

响应 `/user` 路径的 PUT 请求：
```js
app.put('/user', (req, res) => {
  res.send('响应 /user 的 PUT 请求')
})
```

响应 `/user` 路径的 DELETE 请求：
```js
app.delete('/user', (req, res) => {
  res.send('响应 /user 的 DELETE 请求')
})
```

## 请求对象
request 对象代表 HTTP 请求

### 对象中的属性

| 属性 | 说明 |
| -- | -- |
| [req.app](http://expressjs.com/en/4x/api.html#req.app) | 保存对正在使用中间件的Express应用程序实例的引用 |
| [req.baseUrl](http://expressjs.com/en/4x/api.html#req.baseUrl) | 路由器实例被挂载的URL路径 |
| [req.body](http://expressjs.com/en/4x/api.html#req.body) | 包含在请求主体中提交的键值对数据 |
| [req.cookies](http://expressjs.com/en/4x/api.html#req.cookies) | 包含请求发送的cookie的对象。如果请求不包含cookie，它默认为{} |
| [req.fresh](http://expressjs.com/en/4x/api.html#req.fresh) | 当响应在客户端缓存中仍然是新的时，返回true，否则返回false，表示客户端缓存现在是陈旧的，应该发送完整的响应 |
| [req.hostname](http://expressjs.com/en/4x/api.html#req.hostname) | 包含从主机HTTP头派生的主机名 |
| [req.ip](http://expressjs.com/en/4x/api.html#req.ip) | 请求的远程IP地址 |
| [req.ips](http://expressjs.com/en/4x/api.html#req.ips) | 当信任代理设置的计算结果不为false时，此属性包含在X-Forwarded-For请求头中指定的IP地址数组。否则，它将包含一个空数组。此报头可以由客户端或代理设置 |
| [req.method](http://expressjs.com/en/4x/api.html#req.method) | 包含一个与请求的HTTP方法相对应的字符串:GET、POST、PUT等 |
| [req.originalUrl](http://expressjs.com/en/4x/api.html#req.originalUrl) | 类似 req.url, 但它保留了原始的请求 url, 运行重写 request |
| [req.params](http://expressjs.com/en/4x/api.html#req.params) | 包含映射到指定路由“参数”的属性 |
| [req.path](http://expressjs.com/en/4x/api.html#req.path) | 包含请求URL的路径部分 |
| [req.protocol](http://expressjs.com/en/4x/api.html#req.protocol) | 请求协议字符串(http或(对于TLS请求)https) |
| [req.query](http://expressjs.com/en/4x/api.html#req.query) | 路由中每个查询字符串参数的属性 |
| [req.route](http://expressjs.com/en/4x/api.html#req.route) | 当前匹配的路由 |
| [req.secure](http://expressjs.com/en/4x/api.html#req.secure) | 一个布尔属性，如果建立TLS连接则为真 |
| [req.singneedCookies](http://expressjs.com/en/4x/api.html#req.signedCookies) | 当使用cookie解析器中间件时，此属性包含由请求发送的、未签名的、可使用的签名cookie |
| [req.stale](http://expressjs.com/en/4x/api.html#req.stale) | 指示请求是否“陈旧”，与req.fresh相反 |
| [req.subdomains](http://expressjs.com/en/4x/api.html#req.subdomains) | 请求的域名中的子域数组 |
| [req.xhr](http://expressjs.com/en/4x/api.html#req.xhr) | 如果请求的X-Requested-With报头字段为“XMLHttpRequest”，则该Boolean属性为真，表示请求是由jQuery等客户端库发出的 |


### 对象中的方法

| 方法 | 说明 |
| -- | -- |
| [req.accepts(types)](http://expressjs.com/en/4x/api.html#req.accepts) | 根据请求的Accept HTTP报头字段检查指定的内容类型是否可接受 |
| [req.acceptsCharsets(charts[,...])](http://expressjs.com/en/4x/api.html#req.acceptsCharsets) | 根据请求的Accept-Charset HTTP报头字段返回指定字符集的第一个接受的字符集 |
| [req.acceptsEncodings(encoding[,...])](http://expressjs.com/en/4x/api.html#req.acceptsEncodings) | 基于请求的Accept-Encoding HTTP报头字段返回指定编码的第一个接受编码 |
| [req.acceptsLanguages(lang[,...])](http://expressjs.com/en/4x/api.html#req.acceptsLanguages) | 根据请求的Accept-Language HTTP报头字段返回指定语言的第一个接受的语言 |
| [req.get([field])](http://expressjs.com/en/4x/api.html#req.get) | 返回指定的HTTP请求报头字段(不区分大小写) |
| [req.is(type)](http://expressjs.com/en/4x/api.html#req.is) | 如果传入请求的“content - type”HTTP报头字段与类型参数指定的MIME类型匹配，则返回匹配的内容类型。如果请求没有正文，则返回null。返回false,否则 |
| [req.param(name[,defaultValue])](http://expressjs.com/en/4x/api.html#req.param) | 返回当前参数名的值 |
| [req.range(size[,options])](http://expressjs.com/en/4x/api.html#req.range) | 请求头解析器  |


## 响应对象
response 对象表示 Express 应用在收到 HTTP 请求时发送的 HTTP 响应

### 对象中的属性

| 属性 | 说明 |
| -- | -- |
| [res.app] | |
| [res.headerSent] | |
| [res.locals] |  |