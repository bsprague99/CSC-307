const mongoose = require('mongoose')

const BarberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    imgPath: {
      type: String,
      required: false,
      trim: true,
    },
    availability: [{ startTime: Date, endTime: Date }],
    appointments: [ { type: mongoose.Types.ObjectId, ref: "Appointment"} ],
    lat: { type: Number },
    lon: { type: Number },
  },
  { collection: 'barbers' },
)

const Barber = mongoose.model('Barber', BarberSchema)

module.exports = Barber
