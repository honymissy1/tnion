const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    title:  String, 
    content: String,
    likes: Number,
    comments: [
        {  
            user: String,
            content: String,
            date: { type: Date, default: new Date() },
            
        }
    ],
    picture: String,
    date: { type: Date, default: new Date() },
})

module.exports = mongoose.model('blogpost', blog)