const { 
    loginUser, 
    registerUser,
    userProfile 
    } = require('../controllers/user.controllers');

const route = require('express').Router()
const checkLogin = require('../middlewares/checkLogin')





route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/profile',checkLogin ,userProfile)

module.exports = route ;