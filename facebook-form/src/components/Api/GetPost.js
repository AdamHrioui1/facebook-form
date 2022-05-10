import React, { useState, useEffect } from 'react'
import axios from 'axios'

function GetPost(callback, token) {
    const [post, setPost] = useState([])

    const getPosts = async () => {
        try {
            const res = await axios.get('/api/post')
            setPost(res.data.posts[0])
        } catch (err) {
            console.log('get post error: ', err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [callback])

    return post
}

export default GetPost