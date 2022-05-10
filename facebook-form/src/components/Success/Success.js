import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import garena from '../imgs/garena.png'
import lock from '../imgs/lock.svg'
import pen from '../imgs/pen.svg'
import GlobaleState from '../../GlobalseState'
import { Link } from 'react-router-dom'

function Success() {
  const [text, setText] = useState([])
  const state = useContext(GlobaleState)
  const post = state.post

  useEffect(() => {
    if(post) setText(post.text1)
  }, [post])

  if(post.length === 0) return null

  return (
    <div className='success__page'>
      <Navbar />
      <div className="container">
        <div className="img__container">
          <img src={post.img_url} alt="garena logo" />
        </div>

        {
          text ? 
          <span className='first__text'>
            <strong>{text.split(' ')[0]}</strong>{text.slice(text.split(' ')[0].length, text.length)}
          </span>
          :
          <span></span>
        }

        <div className="edit">
          <img src={pen} alt="pen svg" className='pen' />
          <span>Edit This</span>
        </div>

        <div className="continue__btn">
          <Link to='/success'>Continue as Oaut</Link>
        </div>

        <div className='private'>
          <img src={lock} className='lock' alt="lock svg" />
          <span>This doesn't let the app post to Facebook</span>
        </div>

        <div className="success__footer">
          <span>App Term · Privacy Policy</span>
        </div>
      </div>

    </div>
  )
}

export default Success