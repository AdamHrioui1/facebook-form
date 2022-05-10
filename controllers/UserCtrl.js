const User = require('../models/UserModel');

const UserCtrl = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).json({ users: users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createUser: async (req, res) => {
        try {
            const { email, password } = req.body
            if(email.length < 9) return res.status(400).json({ msg: 'Please enter your email!'})
            if(password.length < 4) return res.status(400).json({ msg: 'Incorrect password!'})

            const newUser = new User({
                email: email, password: password
            })

            await newUser.save()
            return res.status(200).json({ newUser })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            await User.findByIdAndDelete({ _id: id })
            return res.status(200).json({ msg: 'User deleted successfuly' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = UserCtrl