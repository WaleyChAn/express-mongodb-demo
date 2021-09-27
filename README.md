## 概述

使用 express 搭建简单的服务端，并且链接 mongodb 实现接口访问。

## 准备

- 安装并配置 [nodejs](https://nodejs.org/zh-cn/)
- 安装并配置 [mongodb](https://www.mongodb.org)

## 初始化

```bash
npm install express --save
```

## 项目开始

新建一个服务入口文件，实例模板中为 [server.js](./server.js)，初始化 express，将服务运行在 3000 端口上。

```bash
const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log('listen ok')
})
```

## 第一个接口

```bash
app.get('/', function (req, res) {
  res.send([
    {
      page: 'Home'
    }
  ])
})
```

大家可以使用 vscode 的插件或者 postman 等工具来进行后续接口的调试。

## 使用 mongoose

```bash
npm install mongoose --save
```

### 引入并链接本地 mongodb 数据库

```bash
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

```

express 你数据库的名称，可以自己自定义与项目相关联的名字。

注意，connect 的几个属性要添加上，不然会报错，可能版本不一致需要的属性也不一样，根据 node 的提示把属性加上就好。

### 新建数据模型，用户数据存储

```bash
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String
}))
```

schema 里的属性，就是你要存储的数据的属性，需要定义好字段类型，具体的类型可以参照 [mongoose](https://mongoosejs.com/docs/schematypes.html) 的 api

### 从数据库中获取数据

```bash
app.get('/products', async function (req, res) {
  const data = await Product.find()
  res.send(data)
})
```

这里的 products 集合没有数据的话可以手动添加几条，或者用 insertMany 的方式添加。

## 增删改查

### 增

```bash
app.post('/products', async function (req, res) {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})
```

### 删

```bash
app.delete('/products/:id', async function (req, res) {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({
    success: true
  })
})
```

或者使用 findByIdAndDelete

```bash
Product.findByIdAndDelete(req.params.id)
```

### 改

```bash
app.put('/products/:id', async function (req, res) {
  const data = req.body
  const product = await Product.findById(req.params.id)
  product.title = data.title
  await product.save()
  res.send(product)
})
```

或者使用 findByIdAndUpdate

```bash
Product.findByIdAndUpdate(req.params.id, req.body)
```

### 查

```bash
app.get('/products/:id', async function (req, res) {
  const data = await Product.findById(req.params.id)
  res.send(data)
})
```
