import { React, useState } from 'react'
import './Table.css'

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

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Time</th>
      </tr>
    </thead>
  )
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td class='row'>
          {convertTime(row.startTime)}-{convertTime(row.endTime)}
          <div>
            <button class="appointSubmit"onClick={() => props.setVisible(index)}>Schedule</button>
          </div>
        </td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} setVisible={props.setVisible}/>
    </table>
  )
}
export default Table
