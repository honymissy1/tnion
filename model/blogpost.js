const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    title:  String, 
    body: String,
    likes: Number,
    comments: {
        name: String,
        comment: String
    },
    image: String,
    createdAt: { type: Date, default: new Date() },
})

module.exports = mongoose.model('blogpost', blog)