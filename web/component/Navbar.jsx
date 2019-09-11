
import React from 'react'

import {Link} from 'react-router-dom'

const Navbar = props => (
  <div className="navbar">
    <ul>
      <li>
        <img alt="HopeBox" className="logo" src="img/logo.jpg" />
      </li>
      <li>
        <Link to="/map">Map</Link>
      </li>
      <li>
        <Link to="/manage">Manage</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </ul>
  </div>
)

export default Navbar
