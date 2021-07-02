const express = require('express');
const registerUser = require('./routes/registeredUser')
require('dotenv').config()

const app = express()
const port = process.env.PORT
app.listen(port);


app.use('/home', registerUser)
app.get('/', (req,res) =>{
    res.send('booomerrrrrrange')
})
