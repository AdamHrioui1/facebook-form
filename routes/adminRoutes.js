const router = require('express').Router()
const AdminCtrl = require('../controllers/AdminCtrl')

router.post('/login', AdminCtrl.login)
router.get('/refreshtoken', AdminCtrl.refreshtoken)
router.get('/logout', AdminCtrl.logout)

module.exports = router