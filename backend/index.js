const express = require('express')
const app = express()
const port = 4000
const fetch = require('node-fetch')

app.get('/', (req, res) => res.send('This will contain the react app'))

app.get('/api/*', async (req, res) => {
  const jsonServerUrl = req.originalUrl.substr(5)
  const response = await fetch(`http://localhost:6112/${jsonServerUrl}`)
  const json = await response.json()
  res.json(json)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
