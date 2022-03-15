const express = require('express');
const Route = express.Router();

Route.get('/', (req, res) =>{
    res.sendFile('/public/blog.html', {root:__dirname+'/..'})
})

Route.get('/blogposts', (req, res) =>{
    res.json([
        {
            id: 1,
            title: 'Big Treats',
            image: './shops/assets/images/item-05.jpg',
            body: 'We love guys like this in the rain but we put things good',
            likes: 34,
            date: '13/9/1901'
        },

        
        {
            id: 13,
            title: 'Small Onions',
            image: './shops/assets/images/item-01.jpg',
            body: 'In this article we put up avery strong foght against the army',
            likes: 34,
            date: '13/4/1991'
        },

        
        {
            id: 345,
            title: 'Church gist',
            image: './shops/assets/images/item-03.jpg',
            body: 'I love Christ Embassy because its my own church',
            likes: 346,
            date: '3/4/1990'
        }

    ])
})

Route.get('/:id', (req, res) =>{
 const id = req.params.id

 // database query here...
 res.render('blogpost', {id: id,name: 'Olayinka'});   
})

module.exports = Route