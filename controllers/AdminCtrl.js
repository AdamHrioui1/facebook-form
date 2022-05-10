const Admin = require('../models/AdminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AdminCtrl = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await Admin.findOne({ email: email })

            if(!admin) return res.status(400).json({ msg: 'Email not found'})

            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) return res.status(400).json({ msg: 'Incorrect password!!'})

            const accesstoken = createAccessToken({ id: admin._id })
            const refreshtoken = createRefreshToken({ id: admin._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/admin/refreshtoken'
            })

            return res.status(200).json({ accesstoken })      
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const token = req.cookies.refreshtoken
            if(!token) return res.status(400).json({ msg: 'Invalid authentication!'})
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({ msg: 'Invalid authentication!'})

                const accessstoken = createAccessToken({ id: user.id })
                return res.status(200).json({ accessstoken })
            })     
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refrestoken', { path: '/admin/refreshtoken' })
            return res.status(200).json({ msg: 'Logout successfuly!'})      
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = AdminCtrl