const express = require('express');
const Route = express.Router();
const registeredUser = require('../model/registeredUser');
const jwt = require('jsonwebtoken');

Route.post('/register', (req, res) =>{
    registeredUser.findOne({email: req.body.email})
    .then(result => {
        if(result) {
            console.log('we have u already')
            res.status(401).send({message: 'User already exist Sign In or check email'})
        }else{
            const user = new registeredUser({
                title: req.body.title, 
                fullname: req.body.fullname,
                country: req.body.country,
                email: req.body.email,
                password: req.body.password,
                church: req.body.church,
                responsibility: req.body.responsibility,
                category: req.body.category,
                verified: false 
             })
            
              user.save()
             .then(response =>{
                 const token = jwt.sign({id: response._id}, 'ourJwtSecretishere', { expiresIn: 3 * 24 * 60 * 60 })
                 res.cookie('jwt', token)
                 res.redirect('/')
                 console.log(response._id)
                }).catch(err =>{
                 console.log('what have we done');
             })
        }
    })
})

Route.post('/loginuser', (req,res) =>{
    registeredUser.findOne({email: req.body.email})
    .then(result => {
        if(result) {
         if(req.body.password === result.password){
            const token = jwt.sign({id: result._id}, 'ourJwtSecretishere', { expiresIn: 1 * 24 * 60 * 60 })
            res.cookie('jwt', token, {expiresIn: 1 * 24 * 60 * 60, httpOnly: true})
             res.status(200).json({message: "Logged In"})
         }else{
          res.status(404).json({message: "Email/Password do not match"})
         }
        }else{
          res.status(404).json({message: "Email/Password do not match"})
        }
    })
})


module.exports = Route