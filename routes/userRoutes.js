const UserCtrl = require('../controllers/UserCtrl')
const auth = require('../middleware/auth')
const router = require('express').Router()

router.route('/user')
    .get(auth, UserCtrl.getUsers)
    .post(UserCtrl.createUser)

router.route('/user/:id')
    .delete(auth, UserCtrl.deleteUser)

module.exports = router