import axios from 'axios'

export async function addClient(client) {
  try {
    const response = await axios.post('http://localhost:5000/clients', client)
    return response.data
  } catch (error) {
    console.log(error)
    return false
  }
}
