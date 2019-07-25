const express = require('express')
const compression = require('compression')
const app = express()
const port = 80
const fetch = require('node-fetch')
const path = require('path');

app.use(express.static('build'))
app.use(compression())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'build/index.html'));
})

app.get('/api/*', async (req, res) => {
  const jsonServerUrl = req.originalUrl.substr(5)
  const response = await fetch(`http://localhost:6112/${jsonServerUrl}`)
  const json = await response.json()
  res.json(json)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
