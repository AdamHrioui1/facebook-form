import React, { useContext, useState } from 'react'
import Navbar from "../Navbar/Navbar";
import garena from '../imgs/garena.png'
import axios from 'axios'
import GlobaleState from '../../GlobalseState'

function Upload() {
  const [image, setImage] = useState([])
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const state = useContext(GlobaleState)
  const post = state.post
  const [token] = state.token

  const handleUpload = async e => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const file = e.target.files[0]

      if(!file) return alert('No file uploded!')

      if(file.size > 1024*1024) return alert('File is too large!')
      
      if(file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') return alert('File type not supported!')

      const formData = new FormData()
      formData.append('file', file)

      const res = await axios.post('/file/upload', formData, {
        headers: {
          'Authorization': token,
          'content-type': 'multipart/form-data'
        }
      })

      setIsLoading(false)
      setImage(res)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleRemove = async (id) => {
    try {
      const res = await axios.post('/file/destroy', {
        public_id: id
      }, {
        headers: {
          'Authorization': token
        }
      })

      setImage([])
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.put(`/api/post/${post._id}`, {
        text1: text1, text2: text2, img_url: image.data.secure_url, public_id: image.data.public_id
      }, {
        headers: {
          'Authorization': token
        }
      })

      if(res) {
        setImage('')
        setText1('')
        setText2('')
        window.location.href = '/continue'
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  
  return (
    <div className='upload__container'>
      <Navbar />
      <div className="row margin">
        <div className="column2 img">
          {
            image && image.data ?
            <div className="upload_img_container">
              <img className='uploaded__img' src={image.data.secure_url} alt="" />
              <span onClick={() => handleRemove(image.data.public_id)}>✖</span>
            </div> 
            :
            isLoading ? 'loading...' :
            <input type="file" name='file' onChange={handleUpload} />
          }
        </div>

        <div className="column2 enter__text">
          <form onSubmit={handleSubmit}>
            <textarea name="" id="" cols="30" rows="5" className='textarea' onChange={e => setText1(e.target.value)} placeholder='First text...' ></textarea>
            <textarea name="" id="" cols="30" rows="5" className='textarea' onChange={e => setText2(e.target.value)} placeholder='Second text...'></textarea>
            <input type="submit" value='Uplaod' className='upload'  />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Upload