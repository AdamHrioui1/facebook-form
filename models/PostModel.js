const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text1: {
        type: String,
        required: true
    },
    text2: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post