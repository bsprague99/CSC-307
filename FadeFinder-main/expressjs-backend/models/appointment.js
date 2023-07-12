const mongoose = require('mongoose')

//qrCCkopZ6AzPwztj

const AppointmentSchema = new mongoose.Schema(
  {
    date: {
      startTime: Date,
      endTime: Date
    },
    clientName: {
      type: String,
      required: true,
      trim: false,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: false,
    },
    barber_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barber',
      required: true,
      trim: false,
    },
  },
  { collection: 'appointments' }
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment
