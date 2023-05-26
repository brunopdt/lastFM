import React from 'react'
import './css/Navbar.css'
import logo from './assets/lastfm-logo.png'
import { GoMarkGithub } from 'react-icons/go'

function Navbar() {
  return (
    <nav id="navbar">
      <img id="logo" src={logo} alt="" />
      <a href="https://github.com/brunopdt">
        <GoMarkGithub id="github" />
      </a>
    </nav>
  )
}

export default Navbar
