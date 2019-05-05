import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import base64 from 'base-64'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080
const BASE_URL = process.env.PLANNING_CENTER_URL
const APP_ID = process.env.PLANNING_CENTER_APPLICATION_ID
const APP_SECRET = process.env.PLANNING_CENTER_APPLICATION_SECRET

const LIST_GROUPS_ID = '806553'
const LIST_SERVICES_ID = '806560'
const INCLUDES = `?include=people`
const TYPE_PERSON = 'Person'

const headers = {
  "Authorization": "Basic " + base64.encode(`${APP_ID}:${APP_SECRET}`)
}

const app = express()
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'pong' })
})

app.get('/groups', (req, res) => {

  res.send('missed groups')
})

app.get('/services', async (req, res) => {
  const missedServices = await getList(LIST_SERVICES_ID)
  res.json(missedServices)
})

const server = app.listen(PORT, () => {
  console.log('BASE_URL:', BASE_URL)
  console.log('APP_ID:', APP_ID)
  console.log('APP_SECRET:', APP_SECRET)
  console.log(`Listening on port http://localhost:${server.address().port}`)
})

const getUrl = listId => {
  return `${BASE_URL}/people/v2/lists/${listId}${INCLUDES}`
}

const getList = async listId => {
  const url = getUrl(listId)
  const res = await fetch(url, {
    method: 'GET',
    headers
  }).then(res => res.json())
  const people = res.included && res.included
    .filter(include => include.type === TYPE_PERSON)
    .map(person => ({
      pc_id: person.id,
      name: person.attributes.name
    }))
  return people
}