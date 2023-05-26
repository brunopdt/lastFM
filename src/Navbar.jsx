import React from 'react'
import './css/Navbar.css'
import { GoMarkGithub } from 'react-icons/go'

function Navbar() {
  return (
    <nav id="navbar">
      <a href="https://github.com/brunopdt">
        <GoMarkGithub id="github" />
      </a>
    </nav>
  )
}

export default Navbar
