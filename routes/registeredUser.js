const express = require('express');
const Route = express.Router();


Route.get('/',(req,res) =>{
    res.send('boooooom')
    console.log('booom');
})

module.exports = Route