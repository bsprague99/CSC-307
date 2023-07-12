import './barberselect.css'
import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'barber_id', label: 'Essa' },
  { value: 'barber0_id', label: 'Lebron' },
  { value: 'barber1_id', label: 'Kobe' },
]

export default function BarberSelect() {
  return (
    //boring about page that never changes, route to path "/about"
    <header>
      <div class="title">
        <h1>Select a Barber:</h1>
      </div>

      <div class="dropdown">
        <Select isSearchable={true} options={options} />
      </div>
    </header>
  )
}
