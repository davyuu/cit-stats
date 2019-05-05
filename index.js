import express from 'express'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 8080;

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${server.address().port}`)
})
