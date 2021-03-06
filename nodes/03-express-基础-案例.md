# 案例

## 接口设计

- 查看任务列表
  - 方法 GET
  - 路径 `/todos`
- 查询单个任务
  - 方法 GET
  - 路径 `/todos/:id`
- 添加任务
  - 方法 PSOT
  - 路径 `/todos`
- 修改任务
  - 方法 PATCH
  - 路径 `/todos/:id`
- 删除任务
  - 方法 DELETE
  - 路径 `/todos/:id`

## 准备初始数据

```json
{
  "todos": [
    {
      "title": "吃饭",
      "id": 1
    },
    {
      "title": "睡觉",
      "id": 3
    }
  ],
  "users": []
}
```

## 封装数据库操作模块

```js
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dataPath = path.join(__dirname, "./data.json");

exports.getData = async () => {
  const data = await readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

exports.saveData = async (db) => {
  const data = JSON.stringify(db, null, " ");
  await writeFile(dataPath, data);
};
```

## Read 查询列表

```js
const { getData, saveData } = require("./data.js");



app.get("/todos", async (req, res) => {
  try {
    const db = await getData();
    res.status(200).json(db.todos);
  } catch (err) {
    res.status(500).json({
      error: err.messge,
    });
  }
});
```

## Read 根据 id 查询

```js
app.get("/todos/:id", async (req, res) => {
  try {
    const db = await getData();
    const todo = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );

    if (!todo) return res.status(400).end();

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.messge,
    });
  }
});
```

## Create 添加

```js
app.use(express.json());



app.post("/todos", async (req, res) => {
  try {
    // 获取请求参数
    const todo = req.body;
    console.log(todo);
    // 验证数据
    if (!todo.title) {
      return res.status(422).json({
        error: "The filed title is required",
      });
    }

    // 存储数据
    const db = await getData();

    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    await saveData(db);

    // 发送响应
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.messge,
    });
  }
});
```

## Update 更新

```js
app.patch("/todos/:id", async (req, res) => {
  try {
    // 获取请求参数
    const todo = req.body;

    const db = await getData();
    const ret = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );

    if (!ret) return res.status(404).end();

    Object.assign(ret, todo);

    await saveData(db);

    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({
      error: err.messge,
    });
  }
});
```

## Destroy 删除

```js
app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = Number.parseInt(req.params.id);
    const db = await getData();
    const index = db.todos.findIndex((todo) => todo.id == todoId);

    if (index === -1) return res.status(404).end();

    db.todos.splice(index, 1);
    await saveData(db);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.messge,
    });
  }
});
```