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
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('blogpost', blog)