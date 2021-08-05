const loginAccessThree = (req, res,next) =>{
    console.log('we came third');
    next()
}

module.exports = {
    loginAccessThree 
}