require('dotenv/config')
const fetch = require('node-fetch')

const SERVER_URL = process.env.SERVER_URL
const UPDATE_CONFIRMED_SERVICE_URL = `${SERVER_URL}/services/confirmed`
const UPDATE_DECLINED_SERVICE_URL = `${SERVER_URL}/services/declined`

fetch(UPDATE_CONFIRMED_SERVICE_URL, { method: 'PATCH' })
    .then(res => res.json())
    .then(res => console.log('update confirmed: ', res))

fetch(UPDATE_DECLINED_SERVICE_URL, { method: 'PATCH' })
    .then(res => res.json())
    .then(res => console.log('update declined: ', res))