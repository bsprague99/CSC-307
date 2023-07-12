import axios from 'axios'

export async function addAppointment(appointment) {
  try {
    const response = await axios.post(
      'http://localhost:5000/appointments',
      appointment
    )
    return response
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getAppointments() {
  try {
    const response = await axios.get('http://localhost:5000/appointments')
    return response
  } catch (error) {
    console.log(error)
    return false
  }
}
