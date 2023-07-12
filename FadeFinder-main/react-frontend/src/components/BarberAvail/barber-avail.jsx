import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../navbar/navbar'
import Geocode from "react-geocode";
import './barber-avail.css'
import AvailForm from './AvailForm'
import AvailTable from './AvailTable'
import AppointTable from './AppointTable'
import {
  getBarberAvail,
  addBarberAvail,
  deleteBarberAvail,
  updateBarber,
  getBarberAppointments,
} from '../../BackendRoutes/barber-routes'

Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.setApiKey("AIzaSyB2JzmC2-zlf3SiXHPcioUHMfDeOcsIXpU");
Geocode.enableDebug();


export default function BarberAvailability() {
  const [allAvail, setAllAvail] = useState([])
  const [allApps, setAllApps] = useState([])
  const location = useLocation()
  console.log(location)
  const barber = location.state
  console.log(barber)
  // const [name, setName] = useState(String(barber.name))
  // const [email, setEmail] = useState(String(barber.email))
  const [address, setAddress] = useState(String(barber.address))
  const [bio, setBio] = useState(String(barber.bio))
  const [img, setImg] = useState(String(barber.imgPath))
  const [badAddr, setBadAddr] = useState(false)


  function createBarberObject(lat, lon) {
    return {
      name: barber.name,
      address: address,
      bio: bio,
      imgPath: img,
      lat: lat,
      lon: lon
    }
  }



  useEffect(() => {
    getBarberAvail(barber.name).then((result) => {
      if (result) {
        setAllAvail(result)
      }
    })
    getBarberAppointments(barber.name).then((appResult) => {
      console.log(appResult)
      if (appResult) {
        console.log(appResult)
        setAllApps(appResult)
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  function submitBarber() {
    Geocode.fromAddress(address).then(
      (response) => {
        const geolat = response.results[0].geometry.location.lat;
        const geolng = response.results[0].geometry.location.lng;
        if (geolat !== 0 && geolng !== 0) {
          setBadAddr(false)
          const updatedBarber = createBarberObject(geolat, geolng)
          console.log(updatedBarber)
          updateBarber(updatedBarber).then((res) => {
            console.log(res)
          }).catch((error) => {
            console.log(error)
          })
        }
        else {
          setBadAddr(true)
        }
      }).catch((error) => {
        console.log(error)
        setBadAddr(true)
      })
  }

  function updateList(avail) {
    addBarberAvail(barber.name, avail).then((result) => {
      if (result) {
        console.log(avail)
        setAllAvail(allAvail.concat(avail))
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  function removeOneCharacter(index) {
    console.log(allAvail[index])
    deleteBarberAvail(barber.name, allAvail[index]).then((result) => {
      if (result) {
        const updated = allAvail.filter((avail, i) => {
          return i !== index
        })
        console.log(updated)
        setAllAvail(updated)
      }
    })
  }

  return (
    <div>
      <div class='availability'>
        < Navbar class="navbar"/>
        <form>
          <div class="name">
          <h2>Adjust Profile</h2>
          <label htmlFor="address">Address</label>
          <input type="textarea" 
          value={address}
          name="addr_input"
          onChange={(e) => {setAddress(e.target.value)}}
          />
          {badAddr && <p class="error">Invalid Address</p>}
          <label htmlFor="bio">Bio</label>
          <input type="textarea" 
          value={bio}
          name="bio_input"
          onChange={(e) => {setBio(e.target.value)}}
          />
          <label htmlFor="img">Image Name</label>
          <input type="textarea" 
          value={img}
          name="img_input"
          onChange={(e) => {setImg(e.target.value)}}
          />
          <input type="button" value="Submit Change" onClick={submitBarber} />
          </div>
        </form>
        <h2>Your Appointments</h2>
        <AppointTable characterData={allApps} />
        <h2>Set Availability</h2>
        <AvailTable characterData={allAvail} removeCharacter={removeOneCharacter} />
        <AvailForm handleSubmit={updateList} />
      </div>
    </div>
  )
}
