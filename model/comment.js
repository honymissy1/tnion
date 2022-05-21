const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    user:  String, 
    content: String,
    likes: Number,
    date: { type: Date, default: new Date() },
})

module.exports = mongoose.model('comment', blog)