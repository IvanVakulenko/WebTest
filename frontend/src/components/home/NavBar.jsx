import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/users/registration'>Sign in</Link>
        <Link to='/users/login'>Log in</Link>
    </nav>
  )
}

export default NavBar