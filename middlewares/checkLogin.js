//middlewares/checkLogin.js

const jwt = require('jsonwebtoken');
require('dotenv').config()

const checkLogin = (req,res,next)=>{
    const {authorization} = req.headers ;

    try{
        const token = authorization.split(" ")[1] ;
        const decoded = jwt.verify(token, process.env.SERCRET_KEY )

        const {id,username} = decoded
        req.id = id                 //porer route a jeno
        req.username = username     //information gulo use korte pari

        next()

    } catch(error) {
        res.send(error)
        res.send("Authenication Failed")
        
    }
}

module.exports = checkLogin ;