const express = require('express');
const blogs = require('../model/blogpost');
const path = require('path');
const Route = express.Router();
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const registeredUser = require('../model/registeredUser')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/blogpics')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  
  const upload = multer({ storage: storage })


  const checkUser = async (req, res, next)=> {

    const token = req.cookies.jwt;
    if(token){
        let decoded = jwt.verify(token, 'ourJwtSecretishere');
        if(decoded){
           let commentor = await registeredUser.findOne({_id: decoded.id})
           res.locals.user = commentor
           next()
        } else{
          res.locals.user = null
          next()
           
        }
    }else{
      res.locals.user = null
      next()
    }
}

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
 

Route.get('/', (req, res) =>{
    res.sendFile('/public/blog.html', {root:__dirname+'/..'})
})

Route.get('/blogposts', securedRoutes, (req, res) =>{
    blogs.find().sort({date: -1})
     .then(result =>{
        res.json(result)
     })
})

Route.get('/:id', securedRoutes, checkUser, (req, res) =>{
 const id = req.params.id;
      blogs.findById(id)
      .then(result =>{
          res.render('blogpost', result);   
       })
})


Route.post('/postBlog', upload.single('picture'), function (req, res) {
        const date = new Date()
        blogs.create({
            title: req.body.title,
            content: req.body.content,
            picture: req.file.filename,
            likes: 0,
            comments: [],
            date: date 
        })
        .then(result =>{
            res.redirect('/blogs')
        })
      })

// Likes implimentation
    // Route.post('/:id/like', upload.none(), (req, res) =>{
    //   const id = req.params.id;

    //   blogs.findByIdAndUpdate(id, {$increment: 1})

    // })

// Comment Implimaentation


  Route.post('/:id', securedRoutes, checkUser, upload.none(), (req, res) =>{
    const id = req.params.id;
    const date = new Date()
 
    blogs.findByIdAndUpdate(id, {$push: {comments: {user: res.locals.user.fullname, content: req.body.comment, date: date}}}, {new: true, useFindAndModify: false})
    .then(result =>{
        res.redirect('/blogs/'+id)
    })
  })

  Route.get('/comments/:id', securedRoutes, (req, res) =>{
    const id = req.params.id;
    const date = new Date();

    blogs.find({_id: id}, {comments: 1})
    .then(result =>{
      res.render('blogpost', {comments: result[0].comments});
    })
  })

module.exports = Route