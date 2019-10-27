import express from 'express'
import { fetchListPeople } from '../utils/network'
import { People, Services } from '../models'
import models from '../models/modelTypes'

const SERVICES_DECLINED_LIST_ID = process.env.PLANNING_CENTER_SERVICES_DECLINED_LIST_ID
const SERVICES_CONFIRMED_LIST_ID = process.env.PLANNING_CENTER_SERVICES_CONFIRMED_LIST_ID
const TYPE_CONFIRMED = 'CONFIRMED'
const TYPE_DECLINED = 'DECLINED'

const router = express.Router()

const updateServices = async (people, type) => {
  const dbPeople = (await People.find()).map(person => person._id)

  try {
    const newPeople = people.filter(person => dbPeople.indexOf(person.pc_id) === -1)
    const peopleData = newPeople.map(person => ({
      _id: person.pc_id,
      name: person.name
    }))
    await People.insertMany(peopleData)
    
    const servicesData = {
      people: people.map(person => person.pc_id),
      type,
      $setOnInsert: {
        createdAt: new Date()
      }
    }
    await Services.create(servicesData)
    
    return {
      people
    }
  } catch (error) {
    return error
  }
}

const getServicesByType = type => {
  return Services.find({ type }).populate(models.people)
}

router.get('/confirmed', async (_, res) => {
  const people = await getServicesByType(TYPE_CONFIRMED)
  res.json(people)
})

router.patch('/confirmed', async (_, res) => {
  const people = await fetchListPeople(SERVICES_CONFIRMED_LIST_ID)
  const responseData = await updateServices(people, TYPE_CONFIRMED)
  console.log('patch confirmed', responseData)
  res.json(responseData)
})

router.get('/declined', async (_, res) => {
  const people = await getServicesByType(TYPE_DECLINED)
  res.json(people)
})

router.patch('/declined', async (_, res) => {
  const people = await fetchListPeople(SERVICES_DECLINED_LIST_ID)
  const responseData = await updateServices(people, TYPE_DECLINED)
  console.log('patch declined', responseData)
  res.json(responseData)
})

export default router