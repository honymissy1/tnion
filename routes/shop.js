const express = require('express');
const Route = express.Router();

const shopItems = [
    {
        id: 0,
        name: 'Number One product',
        description: 'blab;pabla',
        image: 'localhost/image1'
    },

    {
        id: 1,
        name: 'Second and mighty product',
        description: 'blab;pabla',
        image: 'localhost/image1'
    },

    {
        id: 3,
        name: 'Save last for e best',
        description: 'blab;pabla',
        image: 'localhost/image1'
    },

    {
        id: 3,
        name: 'Save last for e best',
        description: 'blababla',
        image: 'localhost/image1'
    }
]

Route.get('/', (req, res) =>{
    res.sendFile('/public/shops/shop.html', {root:__dirname+'/..'})
})

// const images = 'http://localhost:8080/images/tnilogo.png'

Route.get('/:id', (req, res) =>{
     const id = req.params.id;
     const finding = shopItems[id];
    res.render('shop', { id: id, name: finding.name})
})




// Connect Payment Integration here

Route.get('/checkout/:id', (req, res) =>{
    const id = req.params.id;
    res.json(shopItems[id])
})


module.exports = Route