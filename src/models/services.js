import mongoose from 'mongoose'
import models from './models'
const Schema = mongoose.Schema

const servicesSchema = new Schema({
  pcId: String,
  name: String
},
{
  timestamps: true
})

export default mongoose.model(models.services, servicesSchema)
