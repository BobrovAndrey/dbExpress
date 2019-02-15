const express = require('express')
const app = express()

app.get('/hello', (req, res, next) => {
  res.send(req.body)
})
const port = process.env.port || 8080
app.listen(port, () => console.log(`Server running at ${port} `))
