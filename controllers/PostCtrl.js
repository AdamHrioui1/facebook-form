const Post = require("../models/PostModel")

const PostCtrl = {
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find()
            return res.status(200).json({ posts })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPost: async (req, res) => {
        try {
            const { text1, text2, img_url, public_id } = req.body
            const newPost = new Post({
                text1, text2, img_url, public_id
            })
            await newPost.save()
            return res.status(200).json({ newPost })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params
            const { text1, text2, img_url, public_id } = req.body
            const updatedPost = await Post.findByIdAndUpdate({ _id: id }, {
                text1: text1, text2: text2, img_url, public_id
            })
            return res.status(200).json({ updatedPost })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = PostCtrl