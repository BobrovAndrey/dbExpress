const express = require('express')
const app = express()
const collection = require('./collections')
const Product = require('./collections')
const mongoose = require('mongoose')

app.get('/hello', (req, res, next) => {
  res.send({ 'Hello': 'true' }, collection.get())
})

app.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: 'req.body.name',
    price: '287'
  })
  product
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

app.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

// app.post('/', (req, res, next) => {
//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     price: req.body.price

//   })
//   product.save().than(result => { console.log(result) })
//     .catch(err => console.log(err))
//   res.status(201).json('Handling post request')
// })
const port = process.env.port || 8080
app.listen(port, () => console.log(`Server running at ${port} `))
