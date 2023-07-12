import axios from 'axios'

import { getBarberByName } from './barber-routes'

export async function getBarberOAuth(user) {
    try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
    })
    return response.data
    }
    catch (error){
        console.log(error)
    }
}