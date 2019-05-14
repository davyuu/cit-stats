import express from 'express'
import { fetchListPeople } from '../utils/network'
import { Services } from '../models'

const SERVICES_LIST_ID = process.env.PLANNING_CENTER_SERVICES_LIST_ID

const router = express.Router()

const fetchServices = async () => {
  const people = await fetchListPeople(SERVICES_LIST_ID)
  return people
}

const createServices = people => {
  const servicesData = people.map(person => ({
    pcId: person.pc_id,
    name: person.name,
    $setOnInsert: {
      createdAt: new Date()
    }
  }))
  Services.create(servicesData)
}

const getServices = () => {
  return Services.find()
}


router.post('/update', async (_, res) => {
  const services = await fetchServices()
  createServices(services)
  res.json(services)
})

router.get('/missed', async (_, res) => {
  const people = await getServices()
  res.json(people)
})

export default router