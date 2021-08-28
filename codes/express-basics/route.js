const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('响应根路径的 GET 请求')
})

app.post('/', (req, res) => {
  res.send('响应根路径 POST 请求')
})

app.put('/user', (req, res) => {
  res.send('响应 /user 的 PUT 请求')
})

app.delete('/user', (req, res) => {
  res.send('响应 /user 的 DELETE 请求')
})

app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
})