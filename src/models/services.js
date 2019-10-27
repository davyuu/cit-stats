import { Schema, model } from 'mongoose'
import models from './modelTypes'

const servicesSchema = new Schema({
  people: [{
    type: String,
    ref: models.people
  }],
  type: {
    type: String,
    enum: ['CONFIRMED', 'DECLINED'],
    required: true
  }
}, {
  timestamps: true
})

export default model(models.services, servicesSchema)
