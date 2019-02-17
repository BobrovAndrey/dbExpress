
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  prcie: Number
})

mongoose.connect('mongodb://Andrey:Andrey@cluster0-shard-00-00-ybpi4.mongodb.net:27017,cluster0-shard-00-01-ybpi4.mongodb.net:27017,cluster0-shard-00-02-ybpi4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
  { useNewUrlParser: true })

module.exports = mongoose.model('Product', productSchema)
