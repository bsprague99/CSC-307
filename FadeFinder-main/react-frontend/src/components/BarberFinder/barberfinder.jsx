import 'mapbox-gl/dist/mapbox-gl.css'
import './barberfinder.css'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Map, { Marker, Popup } from 'react-map-gl'
import { getAllBarbers } from '../../BackendRoutes/barber-routes'
import { Navbar } from '../navbar/navbar'
import { BarberPopUp } from './popup'

import Pin from './pin'

const TOKEN =
  'pk.eyJ1IjoibGR1a2ljIiwiYSI6ImNsZWx2aXkwdDBmOTAzeW96d3V5YWIzd3kifQ.RwD-huz-ONdzVHqJcpYRzg'
console.log(TOKEN)

export default function BarberFinder() {
  const [popupInfo, setPopupInfo] = useState(null)
  const [barbers, setBarbers] = useState([])

  const [viewport, setViewport] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  }, []);

  const navigate = useNavigate()
  const toClientReg = () => {
    navigate('/clientreg', { state: { popupInfo } })
  }

  useEffect(() => {
    getAllBarbers().then((result) => {
      if (result) {
        setBarbers(result.result)
        console.log(result.result)
      }
    })
  }, [])

  function BarberPins() {
    return barbers.map((barber, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={barber.lon}
        latitude={barber.lat}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setPopupInfo(barber)
        }}
      >
        <Pin />
      </Marker>
    ))
  }

  console.log(viewport)

  return (
    <div>
      <Navbar />
      {viewport &&
        <Map
          initialViewState={{
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: 13.5
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={TOKEN}
          style={{ width: '100vw', height: '100vh' }}
        >
          <BarberPins />

          {popupInfo && (
            <Popup
              anchor="top"
              closeButton={false}
              longitude={Number(popupInfo.lon)}
              latitude={Number(popupInfo.lat)}
              onClose={() => setPopupInfo(null)}
            >
              <BarberPopUp barber={popupInfo} reroute={toClientReg} />
            </Popup>
          )}
        </Map>
      }
    </div >
  )
}
