import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import GetPost from './components/Api/GetPost'
import GetUsers from './components/Api/GetUsers'

export const GlobaleState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [callback, setCallback] = useState(false)

    const checkLogin = async () => {
      try {
        const res = await axios.get('/admin/refreshtoken')
        setToken(res.data.accessstoken)
        setIsLogged(true)
      } catch (err) {
        console.log(err.response.data.msg)
      }
    }

    useEffect(() => {
      const firstlogin = localStorage.getItem('firstlogin')
      if(firstlogin) {
        checkLogin()
      }
    }, [])

    const state = {
      token: [token, setToken],
      post: GetPost(callback, token),
      users: GetUsers(callback, token),
      callback: [callback, setCallback],
      isLogged: [isLogged, setIsLogged]
    }
    
    return (
      <GlobaleState.Provider value={state} >
        {children}
      </GlobaleState.Provider>
    )
}

export default GlobaleState