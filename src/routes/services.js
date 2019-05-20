import express from 'express'
import { fetchListPeople } from '../utils/network'
import { People, Services } from '../models'
import models from '../models/modelTypes'

const SERVICES_LIST_ID = process.env.PLANNING_CENTER_SERVICES_LIST_ID

const router = express.Router()

const fetchServices = async () => {
  return await fetchListPeople(SERVICES_LIST_ID)
}

const updateServices = async missedPeople => {
  const dbPeople = (await People.find()).map(person => person._id)
  const newPeople = missedPeople.filter(person => dbPeople.indexOf(person.pc_id) === -1)

  try {
    const peopleData = newPeople.map(person => ({
      _id: person.pc_id,
      name: person.name
    }))
    await People.insertMany(peopleData)
    
    const servicesData = {
      people: missedPeople.map(person => person.pc_id),
      $setOnInsert: {
        createdAt: new Date()
      }
    }
    await Services.create(servicesData)
    
    return {
      people: missedPeople
    }
  } catch (error) {
    return error
  }
}

const getServices = () => {
  return Services.find().populate(models.people)
}


router.post('/update', async (_, res) => {
  const people = await fetchServices()
  const responseData = await updateServices(people)
  res.json(responseData)
})

router.get('/missed', async (_, res) => {
  const people = await getServices()
  res.json(people)
})

export default router