const express = require('express');
// const mongoose = require('mongoose');
const blogs = require('../model/blogpost')
const Route = express.Router();


Route.get('/', (req, res) =>{
    res.sendFile('/public/blog.html', {root:__dirname+'/..'})
})

Route.get('/blogposts', (req, res) =>{
    blogs.find()
     .then(result =>{
        res.json(result)
     })
    

})

Route.get('/:id', (req, res) =>{
 const id = req.params.id
 blogs.findById(id)
  .then(result =>{
      res.render('blogpost', result);   
  })
 // database query here...
})

Route.post('/postBlog', (req,res) =>{
    regitseredUser.insert({
        title: 'we love the price',
        body: "Ok let's talk about the price for now",
        image: "random"
    }).then(result =>{
        res.send(result)
    })
})


module.exports = Route