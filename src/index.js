import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { groups, services } from './routes'

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  mongoose.Promise = global.Promise
}

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => {
  res.json({ message: 'pong' })
})

app.use('/groups', groups)

app.use('/services', services)

const server = app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${server.address().port}`)
})