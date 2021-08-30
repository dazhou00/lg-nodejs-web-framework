# express 与 传统 web 应用

## 概念

## 动态网页渲染

动态指的是页面数据内容，而不是动画之类的

### 发送一段普通的文本

```js
res.send("一段普通文本");
```

### 发送 HTML 格式的文本

```js
res.send("<h1>文本内容</h1>");
```

### 发送 HTML 格式的内容文件

为了便于开发和维护，我们把 HTML 格式的文本放到单独的文件中，比如 index.html：

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

然后通过文件操作读取文件内容发送到客户端：

```js
fs.readFile("index.html", "utf8", (err, data) => {
  if (err) {
    return res.status(404).send("404 Not Found.");
  }
  res.send(data);
});
```

### 处理页面中的动态内容

比如我有一份这样的数据：

```js
const todos = [
  { id: 1, title: "吃饭" },
  { id: 1, title: "睡觉" },
  { id: 1, title: "打豆豆" },
  { id: 1, title: "写代码" },
];
```

我需要把它展示到 HTML 页面中：

```js
<ul>
  <!-- 任务列表 -->
</ul>
```

最简单的做法就是在页面中放一个特殊的标记：

```js
<ul>
  <!-- 任务列表 -->
  ^_^
</ul>
```

然后在后端通过数据生成 HTML 字符串片段：

```js
let str = "";
todos.forEach((todo) => {
  str += `<li>${todo.title}</li>`;
});
```

最终将生成的结果替换到页面中特殊的标记位置，然后发送给客户端浏览器：

```js
res.send(data.replace("^_^", str));
```

### 使用模板引擎

所谓的模板引擎就是一个制定了特殊语法规则帮你简单高效的完成字符串解析替换的功能。

在 Node.js 中有很多不错的[模板引擎](https://github.com/sindresorhus/awesome-nodejs#templating)：

- [marko](https://github.com/marko-js/marko) - 基于 HTML 的模板引擎，可将模板编译为 CommonJS 模块，并支持流，异步渲染和自定义标签。
- [nunjucks](https://github.com/mozilla/nunjucks) - 具有继承，异步控制等功能的模板引擎（受 Jinja2 启发）。
- [handlebars.js](https://github.com/handlebars-lang/handlebars.js) - 胡子模板的超集，其中添加了强大的功能，如 helpers 和更高级的 blocks。
- [EJS](https://github.com/mde/ejs) - 一个 Express 作者开发的简单的模板引擎
- [Pug](https://github.com/pugjs/pug) - 受 Haml 影响的高性能模板引擎。
- [art-template](https://github.com/aui/art-template) - 一个简约、超快的模板引擎。它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

这些模板引擎各有特色，不分上下。这里我以 art-template 为例演示其用法。

## 静态资源托管

### 基本用法

### 托管多个静态资源

### 虚拟路径

### 托管资源路径问题

### 页面中的资源请求路径问题

```

```
