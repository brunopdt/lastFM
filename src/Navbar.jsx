import React from 'react'
import './css/Navbar.css'
import { GoMarkGithub } from 'react-icons/go'

function Navbar() {
  return (
    <nav id="navbar">
      <a target="_blank" href="https://github.com/brunopdt/lastFM">
        <GoMarkGithub id="github" />
      </a>
    </nav>
  )
}

export default Navbar
