import { Schema, model } from 'mongoose'
import models from './modelTypes'

const servicesSchema = new Schema({
  people: [{
    type: String,
    ref: models.people
  }]
}, {
  timestamps: true
})

export default model(models.services, servicesSchema)
