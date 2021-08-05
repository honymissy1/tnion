const mongoose = require('mongoose');

const registeredUser = new mongoose.Schema({
    title:  String, 
    fullname: String,
    country: String,
    email: String,
    password: String,
    church: String,
    responsibility: String, 
    category: String,
    activated: Boolean,
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('user', registeredUser)