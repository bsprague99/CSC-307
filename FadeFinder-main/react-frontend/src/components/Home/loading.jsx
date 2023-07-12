import React from 'react'
import './StartupAnimation.css' // import the CSS file for the startup animation styles

function BarberPole() {
  return (
    <div class="flex-container">
      <div class="unit">
        <div class="pole-unit mono">
          <div class="pole-top">
            <div class="ball"></div>
            <div class="cover"></div>
            <div class="band"></div>
            <div class="thin-band"></div>
          </div>
          <div class="pole-middle">
            <div class="container">
              <div class="pole"></div>
            </div>
          </div>
          <div class="pole-bottom">
            <div class="thin-band"></div>
            <div class="band"></div>
            <div class="cover"></div>
            <div class="ball"></div>
          </div>
        </div>
        <div class="shadow"></div>
      </div>
      {/* <div class="unit">
		<div class="pole-unit vary">
			<div class="pole-top">
				<div class="ball"></div>
				<div class="cover"></div>
				<div class="band"></div>
				<div class="thin-band"></div>
			</div>
			<div class="pole-middle">
				<div class="container">
					<div class="pole"></div>
				</div>
			</div>
			<div class="pole-bottom">
				<div class="thin-band"></div>
				<div class="band"></div>
				<div class="cover"></div>
				<div class="ball"></div>
			</div>
		</div>
		<div class="shadow"></div>
	</div> */}
    </div>
  )
}

export default BarberPole
