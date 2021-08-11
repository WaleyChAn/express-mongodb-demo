// 引入express的实例
const express = require('express')
// 引入cors解决跨域问题
const cors = require('cors')
// 引入mongoose数据库
const mongoose = require('mongoose')

// 连接mongodb
mongoose.connect('mongodb://localhost:27017/express', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// 定义模型-Product
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String
}))

// Product.insertMany([
//   { title: 'title1' },
//   { title: 'title2' },
//   { title: 'title3' },
// ])

// 创建express实例
const app = express()
// 允许express处理json的数据
app.use(express.json())
// 使用cors
app.use(cors())

// 托管静态文件到'/'路径，使其可直接访问
app.use('/', express.static('public'))

app.get('/', function (req, res) {
  res.send([
    {
      page: 'Home'
    }
  ])
})

app.get('/about', function (req, res) {
  res.send([
    {
      page: 'About Us'
    }
  ])
})

app.get('/products', async function (req, res) {
  const data = await Product.find()
  res.send(data)
})

app.get('/products/:id', async function (req, res) {
  const data = await Product.findById(req.params.id)
  res.send(data)
})

app.post('/products', async function (req, res) {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})

app.put('/products/:id', async function (req, res) {
  const data = req.body
  const product = await Product.findById(req.params.id)
  product.title = data.title
  await product.save()
  res.send(product)
})

app.delete('/products/:id', async function (req, res) {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({
    success: true
  })
})

// 运行在3000端口
app.listen(3000, () => {
  console.log('listen ok')
})