const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");

require("./model");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// 挂在路由
app.use("/api", router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
