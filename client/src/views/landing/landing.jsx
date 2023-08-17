import React from 'react';
import { Link } from 'react-router-dom'


import "./landing.css"

const landing = () => {
  return (
    <body className='landin-cont'>
      <h1 className='wlc'>Bienvenido</h1>
      <div className='cont-cent'>
        <Link to= '/home' className='button-link'> HOME </Link>
      </div>

    </body >
  )
}

export default landing 