import './clientreg.css'
import React, { useState } from 'react'
import Table from './Table'
import { addAppointment } from '../../BackendRoutes/appointment-routes'
import { deleteBarberAvail, addBarberAppoint } from '../../BackendRoutes/barber-routes'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../navbar/navbar'
import { useLocation } from 'react-router-dom'
import {ConfirmDialog} from 'primereact/confirmdialog'

export default function ClientRegistration() {
  const [selectedAvail, setSelectedAvail] = useState({startTime: null,endTime: null, _id: null})
  const [allDates, setAllDates] = useState([])
  const [visible, setVisible] = useState(false)
  const [client, setClient] = useState({
    name: '',
    email: ''
  })

  const location = useLocation()
  const barber = location.state.popupInfo
  const navigate = useNavigate()

  const scheduleAppointment = () => {
    console.log(client)
    const newAppoint = {
      date: { startTime: selectedAvail.startTime, endTime: selectedAvail.endTime },
      clientName: client.name,
      clientEmail: client.email,
      barber_id: barber._id
    }
    addAppointment(newAppoint).then((appRes) => {
      console.log(appRes.data)
      deleteBarberAvail(barber.name, selectedAvail).then((delAvailRes) => {
        addBarberAppoint(barber.name, appRes.data).then((res) => {
          setVisible(false)
          navigate('/appointment/success', { state: appRes.data })
        }).catch((error) => {
          console.log(error)
        })
      }).catch((delAvailError) => {
        console.log(delAvailError)
      })
    }).catch((AppError) => {
      console.log(AppError)
    })
  }

  const fetchAppointments = (selectedDate) => {
    console.log(barber.availability)
    const dates = barber.availability.filter((avail) => {
      let tempDate = new Date(avail.startTime)
      console.log("barber" + tempDate.getDate().toString())
      console.log("selected" + selectedDate.getDate().toString())
      return tempDate.getDate() === selectedDate.getDate() + 1
    })
    console.log(dates)
    setAllDates(dates)
  }

  function handleChange(event) {
    console.log(event)
    console.log(event.value)
    if (event.id === "clientName") {
      setClient({
        name: event.value,
        email: client['email']
      })
    } else if (event.id === "clientEmail") {
      setClient({
        name: client['name'],
        email: event.value
      })
    }
  }

  function convertTime(date) {
    let time = new Date(date)
    let hrs = time.getHours()
    if (hrs === 0) hrs = 12
    let min = time.getMinutes()
    var post = 'AM'
    if (hrs >= 12) {
      post = 'PM'
    }
    if (hrs > 12) {
      hrs = hrs % 12
    }
    if (min < 10) return `${hrs}:0${min} ${post}`
    return `${hrs}:${min} ${post}`
  }

  function createMessage() {
    const barberInfo = "Your barber is " + barber.name + ".\n"
    const locationInfo = "Located at " + barber.address + ".\n"
    const appointInfo = "Your appointment starts at " + convertTime(selectedAvail.startTime) + " and ends at " +  convertTime(selectedAvail.endTime) + ". Click \"Yes\" to confirm appointment."
    return (barberInfo + locationInfo + appointInfo)
  }

  function confirmation(index) {
    setSelectedAvail({startTime: allDates[index].startTime, endTime: allDates[index].endTime, _id: allDates[index]._id})
    if (client.name != "" && client.email != "") {
      setVisible(true)
    }
  }


  

  return (
    <div>
      <Navbar />
      <form id="schedule-appointment-form">
        <h2 class='sched_title'>Schedule Appointment</h2>
        <div>
          <label>Barber Name: {location.state.popupInfo.name}</label>
        </div>
        <div>
          <label>Name:</label>
          <input type="text"
                 id="clientName"
                 name="clientName"
                 value={client.name}
                 onChange={(e) => handleChange(e.target)} />
          {client.name == "" && <p id="error">Please enter your name</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email"
                 id="clientEmail"
                name="clientEmail"
                value={client.email}
                onChange={(e) => handleChange(e.target)}
                />
          {client.email == "" && <p id="error">Please enter your email</p>}
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            id="appointment-date"
            name="appointment-date"
            onChange={(e) => fetchAppointments(e.target.valueAsDate)}
          />
        </div>
      </form>
      <h2>Availablity</h2>
      <Table class="Table" characterData={allDates} setVisible={confirmation}/>
      <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={createMessage()} accept={scheduleAppointment}
          header="Appointment Confirmation" icon="pi pi-exclamation-triangle" />
    </div>
  )
}
