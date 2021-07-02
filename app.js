const express = require('express');
const registerUser = require('./routes/registeredUser')
require('dotenv').config()
const cors = require('cors')

const app = express()
const port = process.env.PORT
app.listen(port);
app.use(cors());

app.use('/home', registerUser)
app.get('/', (req,res) =>{
    res.send('we have list of users here thanks')
})
