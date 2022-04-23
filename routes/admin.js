const express = require('express');
const Route = express.Router();
const registeredUser = require('../model/registeredUser.js')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


// const securedRoutes = (req, res, next)=> {
//  const token = req.cookies.jwt;
//  if(token){
//    let decoded = jwt.verify(token, 'ourJwtSecretishereforadmin'); 
//     if(decoded){
//        res.location('/admin/dashboard')  
//     } else{
//         res.location('/admin')
//     } 
//  }else{
//        res.redirect('/')
//  }
// }



// Route.post('/loginuser', (req,res) =>{
//     registeredUser.findOne({email: req.body.email})
//     .then(result => {
//         if(result) {
//          if(req.body.password === result.password){
//             const token = jwt.sign({id: result._id}, 'ourJwtSecretishere', { expiresIn: 1 * 24 * 60 * 60 })
//             res.cookie('jwt', token, {expiresIn: 1 * 24 * 60 * 60, httpOnly: true})
//              res.status(200).json({message: "Logged In"})
//          }else{
//           res.status(404).json({message: "Email/Password do not match"})
//          }
//         }else{
//           res.status(404).json({message: "Email/Password do not match"})
//         }
//     })
// })



Route.get('/', (req, res) =>{
    res.render('admin_signin', {name : 'Toyota'})
})

Route.get('/dashboard', (req, res) =>{
    registeredUser.find()
     .then(result =>{
         res.render('admin', {result: result})
     })
})


module.exports = Route