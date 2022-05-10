import React, { useState, useEffect } from 'react'
import axios from 'axios'

function GetUsers(callback, token) {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        try {
            const res = await axios.get('/api/user', {
                headers: {
                  'Authorization': token
                }
            })
            setUsers(res.data.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(token) {     
            getUser()
        }
    }, [token, callback])
    
    return [users, setUsers]
}

export default GetUsers