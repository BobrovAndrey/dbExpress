
const express = require('express')
const app = express()
const ProductModel = require('./collections').ProductModel
const UserModel = require('./collections').UserModel

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Get
app.get('/', (req, res, next) => {
  res.send({ 'testPassed': 'true' })
  console.log(req.body)
})

app.get('/user/:productId', (req, res, next) => {
  const id = req.params.productId
  UserModel.findById(id)
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

// Find all users
app.get('/users/', (req, res, next) => {
  UserModel.find()
    .then(doc => {
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

// Populate
app.get('/user', (req, res, next) => {
  UserModel.find()
    .populate('product')
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

// Post
app.post('/product', (req, res, next) => {
  if (req.body.brand && req.body.units && req.body.expDate) {
    const product = new ProductModel({
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

app.post('/user', (req, res, next) => {
  if (req.body.name && req.body.lastname && req.body.salary && req.body.skills && req.body.product) {
    const user = new UserModel({
      name: req.body.name,
      lastname: req.body.lastname,
      salary: req.body.salary,
      skills: req.body.skills,
      product: req.body.product
    })
    user
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

// Delete all
app.delete('/user/', (req, res, next) => {
  UserModel.remove()
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

// Find one specified user
app.get('/user/find', (req, res, next) => {
  const requestName = req.body.name
  const requestLastname = req.body.lastname
  UserModel.findOne({ name: `${requestName}`, lastname: `${requestLastname}` })
    .then(res.status(200).json({
      userFound: 'true'
    }))
    .catch(err => console.log(err))
})

// Put (replace)
app.put('/user/:id', (req, res, next) => {
  const userId = req.params.id
  const user = {
    name: req.body.name,
    lastname: req.body.lastname,
    salary: req.body.salary,
    skills: req.body.skills,
    product: req.body.product
  }
  UserModel.findOne({ _id: userId })
    .then(doc => {
      console.log('found user id: ', userId)
      console.log('here is obj: ', doc)
      console.log('user object is: ', user)
      UserModel.replaceOne({ _id: userId }, user)
        .then(doc => {
          res.status(200).json(doc)
        })
    }
    )
    .catch(err => console.log(err))
})

// Patch (modify)

const port = process.env.port || 8080
app.listen(port, () => console.log(`Server running at ${port} `))
