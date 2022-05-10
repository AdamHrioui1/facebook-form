require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./database/connection');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/postRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/file', require('./routes/cloudinaryRoutes'))

connection()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('facebook-form/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'facebook-form', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => console.log(`Server is listening on port: http://localhost:${process.env.PORT}`))