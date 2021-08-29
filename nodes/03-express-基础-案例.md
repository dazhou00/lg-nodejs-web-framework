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
  - 路径 `/todos`
- 删除任务
  - 方法 DELETE
  - 路径 `/todos/:id`

## 准备初始数据

```js
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
