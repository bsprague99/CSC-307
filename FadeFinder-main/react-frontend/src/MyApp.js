import React, { useState, useEffect } from 'react';
import BarberPole from './components/Home/loading';
import './components/Home/startupScreenText.css'; // import the CSS file for the startup animation styles
import Loading from './components/Home/loading'
import BarberAvailability from './components/BarberAvail/barber-avail'
import ClientRegistration from './components/ClientRegister/clientreg'
import BarberFinder from './components/BarberFinder/barberfinder'
import BarberRegistration from './components/BarberRegistration/barber_reg';
import { SuccessSplash } from './components/SuccessSplash/SuccessSplash';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [isStartingUp, setIsStartingUp] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsStartingUp(false);
    }, 3000); // hide the animation after 3 seconds
  }, []);
  return (
    <div className="App">
      {isStartingUp && <BarberPole />}
      <div className="loading-screen">
      <h1 className="loading-screen__logo">FadeFinder</h1>
    </div>
      <header className="App-header">
    {!isStartingUp &&
        <BrowserRouter>
          <Routes>
            <Route path="/loading" element={<Loading />} />
            <Route path="/clientreg" element={<ClientRegistration />} />
            <Route path="/barber/availability" element={<BarberAvailability />} />
            <Route path="/barber/register" element={<BarberRegistration />} />
            <Route path="/appointment/success" element={<SuccessSplash />} />
            <Route path="/" element={<BarberFinder />} />
          </Routes>
        </BrowserRouter>}
      </header>
    </div>
  )
}

export default App
