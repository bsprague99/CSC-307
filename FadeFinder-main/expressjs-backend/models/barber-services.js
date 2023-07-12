const mongoose = require('mongoose')
const barberModel = require('./barber')
// mongoose.set('debug', true)

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error))

async function getBarbers() {
  let results = await barberModel.find()
  return results
}

async function addBarber(barber) {
  try {
    const barberToAdd = new barberModel(barber)
    const savedBarber = await barberToAdd.save()
    return savedBarber
  } catch (error) {
    console.log(error)
    return false
  }
}

async function getBarberByName(barber_name) {
  try {
    console.log(barber_name)
    const barber = await barberModel.findOne({ name: barber_name })
    return barber
  } catch (error) {
    console.log(error)
    return false
  }
}

async function addAvailability(barber_name, new_avail_list) {
  try {
    const barberToUpdate = await barberModel.findOne({ name: barber_name })
    let barber_avail_list = barberToUpdate.availability
    new_avail_list.forEach((avail) => {
      barber_avail_list.push(avail)
    })
    const res = await barberModel.updateOne(
      { name: barber_name },
      { availability: barber_avail_list }
    )
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

async function deleteAvailabilty(barber_name, avail) {
  try {
    const barberToUpdate = await barberModel.findOne({ name: barber_name })
    let avail_list = barberToUpdate.availability.filter((x) => {
      return x._id.toString() !== avail._id
    })
    console.log('avail_list')
    const res = await barberModel.updateOne(
      { name: barber_name },
      { availability: avail_list }
    )
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

async function updateBarber(updatedBarber) {
  try {
    const res = await barberModel.updateOne(
      { name: updatedBarber.name },
      { $set: {address: updatedBarber.address, 
        bio: updatedBarber.bio, 
        imgPath:updatedBarber.imgPath, 
        lat: updatedBarber.lat,
        lon: updatedBarber.lon}}
    )
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

async function addBarberAppointment(barber_name, appointment) {
  try {
    const barber = await barberModel.findOne({ name: barber_name })
    let apps_list = barber.appointments
    apps_list.push(appointment._id)
    const res = await barberModel.updateOne(
      { name: barber_name },
      { $set: {appointments: apps_list}}
    )
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

async function getBarberAppointments(barber_name) {
  try {
    const apps_list = await barberModel.findOne({ name: barber_name }).populate('appointments')
    console.log("here")
    console.log(apps_list)
    return apps_list.appointments
  } catch (error) {
    console.log(error)
    return false
  }
}


exports.getBarbers = getBarbers
exports.getBarberByName = getBarberByName
exports.addBarber = addBarber
exports.addAvailability = addAvailability
exports.deleteAvailabilty = deleteAvailabilty
exports.updateBarber = updateBarber
exports.addBarberAppointment = addBarberAppointment
exports.getBarberAppointments = getBarberAppointments