# Express 基础

## 介绍

- [官方网站](http://expressjs.com/)
- [代码仓库](https://github.com/expressjs/express)
- [中文网站](https://www.expressjs.com.cn/)
- [Awesome Express](https://github.com/rajikaimal/awesome-express)


express 是一个快速，极简的 nodejs web 开发框架
- 接口服务
- 传统的 web 网站
  - [Ghost]
- 开发工具集成
  - [JSON server](https://github.com/typicode/json-server)
  - [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- 服务端渲染中间层等


express 仅仅提供了 web 开发的基础功能，通过中间件的方式集成了很多外部插件来处理 HTTP 请求
- [中间件网站](https://expressjs.com/en/resources/middleware)
- [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html): 解析 HTTP 请求
- [compression](http://expressjs.com/en/resources/middleware/compression.html): 压缩 HTTP 响应
- [cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html): 解析 cookie 数据
- [cors](http://expressjs.com/en/resources/middleware/cors.html): 处理跨域资源请求
- [morgan](http://expressjs.com/en/resources/middleware/morgan.html): HTTP 请求日志记录


express 不对 nodejs 已有的特性进行二次抽象，只是在它之上扩展了 web 应用所需的基本功能
- 内部使用的还是 http 模块
- 请求对象继承 [http.IncomingMessage](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_incomingmessage)
- 响应对象继承 [http.ServerResponse](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse)


基于 express 的[流行框架](http://expressjs.com/en/resources/frameworks.html)
- [LoopBack](https://loopback.io/)：高度可扩展的开源 Node.js 框架，用于快速创建动态的端到端 REST API。
- [Sails](https://sailsjs.com/)：用于Node.js的 MVC 框架，用于构建实用的，可用于生产的应用程序。
- [NestJs](https://github.com/nestjs/nest)：一个渐进式的 Node.js 框架，用于在 TypeScript 和 JavaScript（ES6，ES7，ES8）之上构建高效，可扩展的企业级服务器端应用程序。

