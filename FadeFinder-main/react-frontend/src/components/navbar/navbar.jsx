import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import './navbar.css'
import barbershop_pole from './small_pole.png'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { getBarberOAuth } from '../../BackendRoutes/oauth';
import { getBarberByNameAndEmail } from '../../BackendRoutes/barber-routes';

export function Navbar(){
  const [profile, setProfile] = useState()

  const navigate = useNavigate()
  const toBarberDash = (user) => {
    getBarberOAuth(user).then((oAuthRes) => {
      setProfile({name: oAuthRes.name, email: oAuthRes.email})
      console.log( {name: oAuthRes.name, email: oAuthRes.email} )
      getBarberByNameAndEmail({name: oAuthRes.name, email: oAuthRes.email}).then((barberRes) => {
        if (barberRes.status != 404 && barberRes.barber !== false) {
          console.log(barberRes)
          navigate('/barber/availability', { state: barberRes.barber })
        }
        else
          navigate('/barber/register', { state: { oAuthRes } })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
        console.log(codeResponse)
        toBarberDash(codeResponse)},
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <header> 
        <ul class="nav_bar">
            <h3 class='title'>FadeFinder</h3>
            <img src={barbershop_pole} class="logo" />
            <li id="navlink"><a href="/">Map</a></li>
            <button class="signin"onClick={() => login()}>Barber Login 🚀 </button>
        </ul>
	</header>
  )
}
