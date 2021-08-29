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
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
```

## 路由基础

[路由指南](http://expressjs.com/en/guide/routing.html)

- 路由是指确定应用程序如何响应客户端对特定端点的请求
- 该特定端点是 URI（或路径）和特定的 HTTP 请求方法（GET，POST 等）。
- 每个路由可以具有一个或多个处理程序函数，这些函数在匹配该路由时执行

路由定义采用以下结构：

```js
app.METHOD(PATH, HANDLER);
```

- app 是 Express 实例-
- METHOD 是小写的 HTTP 请求方法
- PATH 是服务器上的路径
- HANDLER 是当路由匹配时执行的功能

响应根路径的 GET 请求：

```js
app.get("/", (req, res) => {
  res.send("响应根路径的 GET 请求");
});
```

响应根路径的 POST 请求：

```js
app.post("/", (req, res) => {
  res.send("响应根路径 POST 请求");
});
```

响应 `/user` 路径的 PUT 请求：

```js
app.put("/user", (req, res) => {
  res.send("响应 /user 的 PUT 请求");
});
```

响应 `/user` 路径的 DELETE 请求：

```js
app.delete("/user", (req, res) => {
  res.send("响应 /user 的 DELETE 请求");
});
```

## 请求对象

request 对象代表 HTTP 请求

### 对象中的属性

| 属性                                                                         | 说明                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [req.app](http://expressjs.com/en/4x/api.html#req.app)                       | 保存对正在使用中间件的 Express 应用程序实例的引用                                                                                                      |
| [req.baseUrl](http://expressjs.com/en/4x/api.html#req.baseUrl)               | 路由器实例被挂载的 URL 路径                                                                                                                            |
| [req.body](http://expressjs.com/en/4x/api.html#req.body)                     | 包含在请求主体中提交的键值对数据                                                                                                                       |
| [req.cookies](http://expressjs.com/en/4x/api.html#req.cookies)               | 包含请求发送的 cookie 的对象。如果请求不包含 cookie，它默认为{}                                                                                        |
| [req.fresh](http://expressjs.com/en/4x/api.html#req.fresh)                   | 当响应在客户端缓存中仍然是新的时，返回 true，否则返回 false，表示客户端缓存现在是陈旧的，应该发送完整的响应                                            |
| [req.hostname](http://expressjs.com/en/4x/api.html#req.hostname)             | 包含从主机 HTTP 头派生的主机名                                                                                                                         |
| [req.ip](http://expressjs.com/en/4x/api.html#req.ip)                         | 请求的远程 IP 地址                                                                                                                                     |
| [req.ips](http://expressjs.com/en/4x/api.html#req.ips)                       | 当信任代理设置的计算结果不为 false 时，此属性包含在 X-Forwarded-For 请求头中指定的 IP 地址数组。否则，它将包含一个空数组。此报头可以由客户端或代理设置 |
| [req.method](http://expressjs.com/en/4x/api.html#req.method)                 | 包含一个与请求的 HTTP 方法相对应的字符串:GET、POST、PUT 等                                                                                             |
| [req.originalUrl](http://expressjs.com/en/4x/api.html#req.originalUrl)       | 类似 req.url, 但它保留了原始的请求 url, 运行重写 request                                                                                               |
| [req.params](http://expressjs.com/en/4x/api.html#req.params)                 | 包含映射到指定路由“参数”的属性                                                                                                                         |
| [req.path](http://expressjs.com/en/4x/api.html#req.path)                     | 包含请求 URL 的路径部分                                                                                                                                |
| [req.protocol](http://expressjs.com/en/4x/api.html#req.protocol)             | 请求协议字符串(http 或(对于 TLS 请求)https)                                                                                                            |
| [req.query](http://expressjs.com/en/4x/api.html#req.query)                   | 路由中每个查询字符串参数的属性                                                                                                                         |
| [req.route](http://expressjs.com/en/4x/api.html#req.route)                   | 当前匹配的路由                                                                                                                                         |
| [req.secure](http://expressjs.com/en/4x/api.html#req.secure)                 | 一个布尔属性，如果建立 TLS 连接则为真                                                                                                                  |
| [req.singneedCookies](http://expressjs.com/en/4x/api.html#req.signedCookies) | 当使用 cookie 解析器中间件时，此属性包含由请求发送的、未签名的、可使用的签名 cookie                                                                    |
| [req.stale](http://expressjs.com/en/4x/api.html#req.stale)                   | 指示请求是否“陈旧”，与 req.fresh 相反                                                                                                                  |
| [req.subdomains](http://expressjs.com/en/4x/api.html#req.subdomains)         | 请求的域名中的子域数组                                                                                                                                 |
| [req.xhr](http://expressjs.com/en/4x/api.html#req.xhr)                       | 如果请求的 X-Requested-With 报头字段为“XMLHttpRequest”，则该 Boolean 属性为真，表示请求是由 jQuery 等客户端库发出的                                    |

### 对象中的方法

| 方法                                                                                             | 说明                                                                                                                                            |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [req.accepts(types)](http://expressjs.com/en/4x/api.html#req.accepts)                            | 根据请求的 Accept HTTP 报头字段检查指定的内容类型是否可接受                                                                                     |
| [req.acceptsCharsets(charts[,...])](http://expressjs.com/en/4x/api.html#req.acceptsCharsets)     | 根据请求的 Accept-Charset HTTP 报头字段返回指定字符集的第一个接受的字符集                                                                       |
| [req.acceptsEncodings(encoding[,...])](http://expressjs.com/en/4x/api.html#req.acceptsEncodings) | 基于请求的 Accept-Encoding HTTP 报头字段返回指定编码的第一个接受编码                                                                            |
| [req.acceptsLanguages(lang[,...])](http://expressjs.com/en/4x/api.html#req.acceptsLanguages)     | 根据请求的 Accept-Language HTTP 报头字段返回指定语言的第一个接受的语言                                                                          |
| [req.get([field])](http://expressjs.com/en/4x/api.html#req.get)                                  | 返回指定的 HTTP 请求报头字段(不区分大小写)                                                                                                      |
| [req.is(type)](http://expressjs.com/en/4x/api.html#req.is)                                       | 如果传入请求的“content - type”HTTP 报头字段与类型参数指定的 MIME 类型匹配，则返回匹配的内容类型。如果请求没有正文，则返回 null。返回 false,否则 |
| [req.param(name[,defaultValue])](http://expressjs.com/en/4x/api.html#req.param)                  | 返回当前参数名的值                                                                                                                              |
| [req.range(size[,options])](http://expressjs.com/en/4x/api.html#req.range)                       | 请求头解析器                                                                                                                                    |

## 响应对象

response 对象表示 Express 应用在收到 HTTP 请求时发送的 HTTP 响应

### 对象中的属性

| 属性                                                                  | 说明                                                                                                                  |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [res.app](http://expressjs.com/en/4x/api.html#res.app)                | 保存对正在使用中间件的 Express 应用程序实例的引用                                                                     |
| [res.headerSent](http://expressjs.com/en/4x/api.html#res.headersSent) | Boolean 属性，指示应用程序是否为响应发送了 HTTP 报头                                                                  |
| [res.locals](http://expressjs.com/en/4x/api.html#res.locals)          | 包含作用域为请求的响应局部变量，因此仅对在该请求/响应周期(如果有的话)中呈现的视图可用。否则，该属性与 app.locals 相同 |

### 对象中的方法

| 方法                                                                                                | 说明                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [res.append(filed [, value])](http://expressjs.com/en/4x/api.html#res.append)                       | 将指定的值附加到 HTTP 响应报头字段                                                                                                                                                                                              |
| [res.attachment([filename])](http://expressjs.com/en/4x/api.html#res.attachment)                    | 设置 HTTP 响应的 Content-Disposition 报头 attachment 字段，如果给定文件名，则通过 res.type()设置基于扩展名的 Content-Type，并设置 Content-Disposition filename                                                                  |
| [res.cookie(name, value [,options])](http://expressjs.com/en/4x/api.html#res.cookie)                | 设置 cookie 名称为 value。value 参数可以是转换为 JSON 的字符串或对象                                                                                                                                                            |
| [res.clearCookie(name [,options])](http://expressjs.com/en/4x/api.html#res.clearCookie)             | 清除 name 指定的 cookie                                                                                                                                                                                                         |
| [res.download(path [,filename][, options][, fn])](http://expressjs.com/en/4x/api.html#res.download) | 以“附件”的形式在路径上传输文件。通常，浏览器会提示用户下载                                                                                                                                                                      |
| [res.end([data][, encoding])](http://expressjs.com/en/4x/api.html#res.end)                          | 结束响应过程                                                                                                                                                                                                                    |
| [res.format(object)](http://expressjs.com/en/4x/api.html#res.format)                                | 在请求对象上的 Accept HTTP 报头出现时执行内容协商。它使用 req. accept()根据根据质量值排序的可接受类型选择请求的处理程序                                                                                                         |
| [res.get(field)](http://expressjs.com/en/4x/api.html#res.get)                                       | 返回由字段指定的 HTTP 响应头。匹配不区分大小写                                                                                                                                                                                  |
| [res.json([body])](http://expressjs.com/en/4x/api.html#res.json)                                    | 发送一个 JSON 响应。此方法发送一个响应(具有正确的内容类型)，该响应是使用 JSON.stringify()将其转换为 JSON 字符串的参数                                                                                                           |
| [res.jsonp([body])](http://expressjs.com/en/4x/api.html#res.jsonp)                                  | 发送一个支持 JSONP 的 JSON 响应。这个方法与 res.json()相同，除了它选择加入 JSONP 回调支持                                                                                                                                       |
| [res.links(links)](http://expressjs.com/en/4x/api.html#res.links)                                   | 连接作为参数属性提供的链接，以填充响应的 Link HTTP 报头字段                                                                                                                                                                     |
| [res.location(path)](http://expressjs.com/en/4x/api.html#res.location)                              | 将响应位置 HTTP 头设置为指定的路径参数                                                                                                                                                                                          |
| [res.redirect([status,] path)](http://expressjs.com/en/4x/api.html#res.redirect)                    | 重定向到具有指定状态的从指定路径派生的 URL，该状态是一个对应于 HTTP 状态代码的正整数                                                                                                                                            |
| [res.render(view[, locals][, callback])](http://expressjs.com/en/4x/api.html#res.render)            | 呈现视图并将呈现的 HTML 字符串发送给客户端                                                                                                                                                                                      |
| [res.send([body])](http://expressjs.com/en/4x/api.html#res.send)                                    | 发送 HTTP 响应                                                                                                                                                                                                                  |
| [res.sendFile(path[, optons][, fn])](http://expressjs.com/en/4x/api.html#res.sendFile)              | 在给定的路径上传输文件.基于文件名的扩展名设置内容类型响应 HTTP 报头字段                                                                                                                                                         |
| [res.sendStatus(statusCode)](http://expressjs.com/en/4x/api.html#res.sendStatus)                    | 将响应 HTTP 状态码设置为 statusCode                                                                                                                                                                                             |
| [res.set(field[, value])](http://expressjs.com/en/4x/api.html#res.set)                              | 将响应的 HTTP 报头字段设置为值。要一次设置多个字段，需要传递一个对象作为参数                                                                                                                                                    |
| [res.status(code)](http://expressjs.com/en/4x/api.html#res.status)                                  | 设置响应的 HTTP 状态                                                                                                                                                                                                            |
| [res.type(type)](http://expressjs.com/en/4x/api.html#res.type)                                      | 将 Content-Type HTTP 报头设置为由指定类型确定的 MIME 类型。如果 type 包含" / "字符，则将 Content-Type 设置为 type 的准确值，否则将假定它是一个文件扩展名，并使用 express. servstatic . MIME .lookup()方法在映射中查找 MIME 类型 |
| [res.vary(field)](http://expressjs.com/en/4x/api.html#res.vary)                                     | 将字段添加到 Vary 响应标头(如果该字段已经不存在的话)                                                                                                                                                                            |
