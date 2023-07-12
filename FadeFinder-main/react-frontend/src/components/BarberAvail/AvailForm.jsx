import React, { useState } from 'react'
import Select from 'react-select'
import './AvailForm.css'
import TimeRange from 'react-time-range'


function AvailForm(props) {

  const appointTimes = [
    {value: '0.5', label: '30 Min'},
    {value: '1', label: '1 Hour'}
  ]

  const [start, setStart] = useState("2023-03-08T17:00:00.312Z");
  const [end, setEnd] = useState("2023-03-08T20:00:00.860Z");
  const [date, setDate] = useState(new Date())
  const [checked, setChecked] = useState(false)
  const [len, setLen] = useState(1)
  const [recur, setRecur] = useState(0)

  const checkChange = () => {
    return setChecked(!checked);
  };

  function handleChange(event) {
    console.log(event)
    if (event.startTime) {
      setStart(event.startTime)
    }
    if (event.endTime) {
      setEnd(event.endTime)
    }
  }

  function getTime(dateString) {
    return dateString.split("T")[1]
  }

  function getDate(dateString) {
    return dateString.split("T")[0]
  }

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  function splitTimes(date0, date1) {
    let times = []
    let hourDiff = round((Math.abs(date0.getHours() - date1.getHours())))
    console.log(hourDiff)
    console.log(len.value)
    let _start = new Date(date0)
    if (_start.getHours() != 0) {
      _start.setHours(_start.getHours() - 1)
    }
    let _end = new Date(date0)
    if (_end.getHours() != 0) {
      _end.setHours(_end.getHours() - 1)
    }
    if (len.label === '1 Hour') {
      console.log("true")
    }
    for (let i = 0; i < hourDiff; i+=Number(len.value)) {
      if (len.label === '1 Hour') {
        _end.setHours(_start.getHours() + Number(len.value))
        times.push({startTime: new Date(_start), endTime: new Date(_end)})
        _start.setHours(_end.getHours())
      }
      else {
        _end.setMinutes(_start.getMinutes() + 30)
        times.push({startTime: new Date(_start), endTime: new Date(_end)})
        _start.setMinutes(_end.getMinutes())
        _start.setHours(_end.getHours())
      }
    }
    console.log(times)
    return times
  }

  function submitForm() {
    let startTime = getDate(date.toISOString()) + "T" + getTime(start.toString())
    let endTime = getDate(date.toISOString()) + "T" + getTime(end.toString())
    let startDate = new Date(startTime)
    let endDate = new Date(endTime)
    console.log(endDate.getTimezoneOffset())
    let avail = {startTime: startDate, endTime: endDate}
    console.log(avail)
    let avail_list = splitTimes(startDate, endDate)
    let recur_list = []
    for (let i = 1; i <= recur && checked; i++) {
      avail_list.forEach((x) => {
        let _start = new Date(x.startTime).setDate(x.startTime.getDate() + 7 * i)
        let _end = new Date(x.endTime).setDate(x.endTime.getDate() + 7 * i)
        recur_list.push({startTime: new Date(_start), endTime: new Date(_end)})
      })
    }
    props.handleSubmit(avail_list.concat(recur_list))

  }

  return (
    <form>
      <label htmlFor="day">Day</label>
      <input
            type="date"
            onChange={(e) => setDate(e.target.valueAsDate)}
          />
      <label>Length of Appointments?
        <Select options={appointTimes} onChange={setLen}/>
      </label>
      <label>Time</label>
      <TimeRange onChange={handleChange} startMoment={start} endMoment={end}/>
      <label>
      <input type="checkbox" value={checked} onChange={checkChange}/>
      Recurring?
      </label>
      {checked && (<label>How many weeks?<input type="number" value={recur} onChange={(e) => setRecur(e.target.valueAsNumber)}/></label>)}
      <input type="button" value="Add" onClick={submitForm} />
    </form>
  )
}
export default AvailForm
