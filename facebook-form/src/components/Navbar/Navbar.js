import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import GlobaleState from '../../GlobalseState'
import facebook_logo from '../imgs/facebook_logo.png'

function Navbar() {
    const state = useContext(GlobaleState)
    const [token, setToken] = state.token
    const [isLogged, setIsLogged] = state.isLogged

    const logout = async () => {
        try {
            const res = await axios.get('/admin/logout')
            if(res) {
                setToken('')
                setIsLogged(false)
                localStorage.removeItem('firstlogin')
                window.location.href = '/login'
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <nav className='navbar'>
            {
                isLogged ?
                <ul>
                    <Link to='/admin/allusers'>
                        <li>Users</li>
                    </Link>
                    <Link to='/admin/upload'>
                        <li>Upload</li>
                    </Link>
                    <li onClick={logout}>Logout</li>
                </ul>
                :
                <div className="logo__container">
                    <img className='logo' src={facebook_logo} alt="facebook white logo" />
                    <span>Log in With Facebook</span>
                </div>

            }

        </nav>
    )
}

export default Navbar