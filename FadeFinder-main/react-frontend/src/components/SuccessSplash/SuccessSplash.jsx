import React, {useState} from 'react';
import { Navbar } from '../navbar/navbar';
import { useLocation } from 'react-router-dom'

export function SuccessSplash(){
  const location = useLocation()
  const appointment = location.state

  return (
    <main> 
        <Navbar />
        <div>
            <h2>Appointment Scheduled!</h2>
            <h3>Thanks for using FadeFinder. Check your email for confirmation.</h3>
        </div>
	</main>
  )
}
