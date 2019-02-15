const express = require('express')
const app = express()
const collection = require('./collections')



app.get('/hello', (req, res, next) => {
  res.send({ 'Hello': 'true' }, collection.get())
})
const port = process.env.port || 8080
app.listen(port, () => console.log(`Server running at ${port} `))
