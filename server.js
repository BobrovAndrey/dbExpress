
const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const ProductModel = require('./collections').ProductModel
const bodyParser = require('body-parser')

console.log(ProductModel)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res, next) => {
  res.send({ 'testPassed': 'true' })
  console.log(req.body)
})

app.post('/', (req, res, next) => {
  console.log('Brand is ', req.body.brand)
  console.log('units is ', req.body.units)
  console.log('expDate is ', req.body.expDate)
  if (req.body.brand && req.body.units && req.body.expDate) {
    const product = new ProductModel({
    // _id: new mongoose.Types.ObjectId(),
      brand: req.body.brand,
      units: req.body.units,
      expDate: req.body.expDate
    })
    product
      .save()
      .then(result => {
        console.log(result)
        res.status(201).json({
          message: 'Handling POST requests to /products',
          createdProduct: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  } else {
    res.status(400).json({
      message: 'Some fields are missing'
    })
  }
})

app.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  ProductModel.findById(id) //.populate('product')
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
