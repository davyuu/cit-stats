require('dotenv/config')
var fetch = require('node-fetch')

const SERVER_URL = process.env.SERVER_URL
const PATCH_MISSED_SERVICE_URL = `${SERVER_URL}/services/missed`

console.log('fetching: ', PATCH_MISSED_SERVICE_URL)

fetch(PATCH_MISSED_SERVICE_URL, { method: 'PATCH' })
    .then(res => console.log(res))
