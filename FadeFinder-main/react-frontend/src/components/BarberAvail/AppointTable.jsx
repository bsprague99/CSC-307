import React from 'react'

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Day</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Client Name</th>
        <th>Client Email</th>
      </tr>
    </thead>
  )
}

function convertTime(date) {
  let time = new Date(date)
  let hrs = time.getHours()
  // if (hrs != 0) {
  //   hrs = hrs - 1
  // }
  console.log(hrs)
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

const getDay = (appDate) => {
  var date = new Date(appDate)
  let day = date.getDate().toString()
  let month = date.getMonth().toString()
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return monthList[month] + " " + day
}

function TableBody(props) {
  console.log(props.characterData)
  const rows = props.characterData.map((row, index) => {
    console.log(row)
    const day = getDay(row.date.startTime)
    const start = convertTime(row.date.startTime)
    const end = convertTime(row.date.endTime)
    return (
      <tr key={index}>
        <td>{day}</td>
        <td>{start}</td>
        <td>{end}</td>
        <td>{row.clientName}</td>
        <td>{row.clientEmail}</td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}

function AppointTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
      />
    </table>
  )
}
export default AppointTable