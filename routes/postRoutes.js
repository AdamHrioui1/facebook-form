const PostCtrl = require('../controllers/PostCtrl')
const auth = require('../middleware/auth')
const router = require('express').Router()

router.get('/post', PostCtrl.getPosts)
router.post('/post', auth, PostCtrl.createPost)
router.put('/post/:id', auth, PostCtrl.updatePost)

module.exports = router