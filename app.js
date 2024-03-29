const express = require('express');
const registerUser = require('./routes/registeredUser');
const shop = require('./routes/shop');
const blog = require('./model/blogpost');
const blogs = require('./routes/blogs');
const admin = require('./routes/admin')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const cors = require('cors');

const app = express()
const port = process.env.PORT
app.listen(port);
app.use(cors());
app.use(express.static('public'))
app.use(express.static('public/shops'))
app.use(express.static('public/images'))

app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())


// ..........Server Routes .........
app.use('/home', registerUser)
app.use('/register', registerUser);
app.use('/shop', shop);
app.use('/blogs', blogs);
app.use('/admin', admin)


mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(response =>{
        console.log('connected..');
    })

const securedRoutes = (req, res, next)=> {
 const token = req.cookies.jwt;
 if(token){
   let decoded = jwt.verify(token, 'ourJwtSecretishere'); 
    if(decoded){
       next()  
    } else{
        res.redirect('/')
    } 
  }else{
     res.redirect('/')
 }
}



app.get('/',  (req, res) =>{
    const token = req.cookies.jwt;
    if(token){
        let decoded = jwt.verify(token, 'ourJwtSecretishere'); 
         if(decoded){
            res.sendFile('/public/Home.html', { root: __dirname})
         } else{
            res.sendFile('/public/signin.html', { root: __dirname})
         } 
      }else{
        res.sendFile('/public/signin.html', { root: __dirname})
    }
 })

app.get('/homepage', securedRoutes, (req, res) =>{
   res.sendFile('/public/Home.html', { root: __dirname})
})

app.get('/signup', (req, res) =>{
    res.sendFile('/public/signup.html', { root: __dirname})
 })

app.get('/contact',securedRoutes, securedRoutes, (req, res)=> {
    res.sendFile('/public/contact.html', { root: __dirname})
})

app.get('/signout', (req, res) =>{
    res.cookie('jwt', '', {maxAge: 1000})
    res.redirect('/')
})



//  .............................Blog Posts.............................................//




