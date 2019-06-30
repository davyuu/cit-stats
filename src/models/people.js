import mongoose from 'mongoose'
import models from './modelTypes'
const Schema = mongoose.Schema

const peopleSchema = new Schema({
  _id: String,
  name: String
})

export default mongoose.model(models.people, peopleSchema)
