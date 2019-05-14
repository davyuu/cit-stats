import fetch from 'node-fetch'
import base64 from 'base-64'

const BASE_URL = process.env.PLANNING_CENTER_URL
const APP_ID = process.env.PLANNING_CENTER_APPLICATION_ID
const APP_SECRET = process.env.PLANNING_CENTER_APPLICATION_SECRET

const INCLUDES = `?include=people`
const TYPE_PERSON = 'Person'

const headers = {
  "Authorization": "Basic " + base64.encode(`${APP_ID}:${APP_SECRET}`)
}

const getUrl = listId => {
  return `${BASE_URL}/people/v2/lists/${listId}${INCLUDES}`
}

export const fetchListPeople = async listId => {
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
