const mongoose = require('mongoose')
const appointmentModel = require('./appointment')
mongoose.set('debug', true)

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error))

async function getAppointments() {
  let results = await appointmentModel.find()
  return results
}

async function addAppointment(appointment) {
  try {
    const appointmentToAdd = new appointmentModel(appointment)
    const savedAppointment = await appointmentToAdd.save()
    return savedAppointment
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.getAppointments = getAppointments
exports.addAppointment = addAppointment
