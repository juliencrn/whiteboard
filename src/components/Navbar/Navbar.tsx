import React from 'react'
import { GitHub } from 'react-feather'
import './Navbar.css'

export default function Navbar() {
  console.log('render <Navbar />')
  return (
    <header className="Navbar">
      <div className="Navbar-left">
        <h1 className="Navbar-title">Whiteboard</h1>
        <p className="Navbar-subtitle">Play with Recoil.js and React-Konva</p>
      </div>
      <div className="Navbar-right">
        <a
          href="https://github.com/Junscuzzy/whiteboard"
          className="Navbar-logo"
        >
          <GitHub />
        </a>
      </div>
    </header>
  )
}
