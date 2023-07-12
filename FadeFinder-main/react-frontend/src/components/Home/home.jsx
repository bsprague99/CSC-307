import './home.css'

export default function Home() {
  return (
    <main className="home">
      <head>
        <link
          href="../DaySchedule/dayschedule-widget.css"
          type="text/html"
          rel="stylesheet"
        />
        <script src="../DaySchedule/dayschedule-widget.js" defer></script>
      </head>
      <div className="buttons">
        <a href="/customerlogin">
          <button>Schedule Appointment</button>
        </a>
        <a href="barberlogin">
          <button>Barber Login</button>
        </a>
      </div>
    </main>
  )
}
