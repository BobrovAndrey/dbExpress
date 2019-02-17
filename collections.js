const mongoose = require('mongoose')
// Athlas usage
// mongoose.connect('mongodb://Andrey:Andrey@cluster0-shard-00-00-ybpi4.mongodb.net:27017,cluster0-shard-00-01-ybpi4.mongodb.net:27017,cluster0-shard-00-02-ybpi4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
//  { useNewUrlParser: true })

// Local usage
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
const db = mongoose.connection
const Schema = mongoose.Schema
db.on('error', (error) => {
  console.log('Error was occured', error.message)
})

db.once('open', () => {
  console.log('Connected to DB')
})

const userSchema = Schema({
  name: String,
  lastname: String,
  salary: Number,
  skills: [String],
  product: { type: String, ref: 'Product' }
})
const productSchema = Schema({
  brand: String,
  units: String,
  expDate: Object
})

const UserModel = mongoose.model('User', userSchema)
const ProductModel = mongoose.model('Product', productSchema)

module.exports = { UserModel, ProductModel }
