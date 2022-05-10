import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobaleState from '../../GlobalseState'
import Admin from '../Admin/Admin'
import AllUsers from '../AllUsers/AllUsers'
import Continue from '../Continue/Continue'
import Error from '../Error/Error'
import Login from '../Login/Login'
import Success from '../Success/Success'
import Upload from '../Upload/Upload'

function Routers() {
  const state = useContext(GlobaleState)
  const [isLogged, setIsLogged] = state.isLogged
  const [token] = state.token

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/success' element={<Continue />} />
        <Route exact path='/continue' element={<Success />} />
        <Route exact path='/admin/login' element={token && isLogged ? <Admin /> : <Admin />} />
        <Route exact path='/admin/allusers' element={token && isLogged ? <AllUsers /> : <Admin />} />
        <Route exact path='/admin/upload' element={token && isLogged ? <Upload /> : <Admin />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default Routers