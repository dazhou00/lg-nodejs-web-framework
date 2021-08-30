const express = require("express");
const { getData, saveData } = require("./data.js");
const app = express();

app.use(express.json());

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
app.post("/todos", async (req, res) => {
  try {
    // 获取请求参数
    const todo = req.body;
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

app.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
