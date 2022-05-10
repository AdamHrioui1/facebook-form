import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import GlobaleState from '../../GlobalseState'
import Navbar from '../Navbar/Navbar'

function AllUsers() {
  const [allUsers, setAllUsers] = useState([])
  const state = useContext(GlobaleState)
  const [users] = state.users
  const [token] = state.token
  const [callback, setCallback] = state.callback

  useEffect(() => {
    if(users) {  
      setAllUsers(users)
    }
  }, [users])

  const removeUser = async (id) => {
    if(window.confirm('Are you sure you want delete this user?')) {
      try {
        await axios.delete(`/api/user/${id}`, {
          headers: {
            'Authorization': token
          }
        })
        setCallback(!callback)
      } catch (err) {
        console.log(err)
      }
    }
  }

  if(!users || users.length === 0) return null

  return (
    <div className='all_users_page'>
      <Navbar />

      <div className="table__container">  
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {
              allUsers.map(user => {
                return (
                  <tr key={user._id} >
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td className='cross' onClick={() => removeUser(user._id)}>✖</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers