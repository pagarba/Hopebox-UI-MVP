
import React from 'react'

import {ucFirst} from '../common/Utils'

import {Link} from 'react-router-dom'

const links = [
  'map',
  'manage',
  'settings',
]

const Navbar = props => (
  <div className="navbar">
    <ul>
      <li>
        <img alt="HopeBox" className="logo" src="img/logo.jpg" />
      </li>
      {links.map(link => (
        <li
          className={props.path.indexOf(`/${link}`) !== -1 ? 'active' : ''}
          key={link}>
          <Link to={`/${link}`}>{ucFirst(link)}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Navbar
