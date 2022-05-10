import React, { useState } from 'react'
import axios from 'axios'

function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/admin/login', {
        email, password
      })

      if(res) {
        localStorage.setItem('firstlogin', true)
        window.location.href = '/admin/upload'
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className='admin__page'>
      <h1>Admin login</h1>
      <form className='form admin__form' onSubmit={handleSubmit}>
        <input type="email" className='input' placeholder='Email address' onChange={e => setEmail(e.target.value)} required />
        <input type="password" className='input' placeholder='Password' onChange={e => setPassword(e.target.value)} required/>
        <input type="submit" className='button login' value='Log in'/>
      </form>
    </div>
  )
}

export default Admin