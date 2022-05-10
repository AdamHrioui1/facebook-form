import React from 'react'
import Navbar from '../Navbar/Navbar'

function Error() {
  return (
    <div className='error__page'>
        <Navbar />
        <div className="error__container">
            <h1>Error 404</h1>
        </div>
    </div>
  )
}

export default Error