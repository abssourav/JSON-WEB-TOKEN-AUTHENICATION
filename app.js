const express = require('express')
const app = express()
const cors = require('cors')

const userRoute = require('./routes/user.routes')
require('./config/database')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())




//all routes
app.use('/user', userRoute)


//Base route
app.get('/',(req,res)=>{
    res.send("Home route")
})

//Handling Route not found
app.use((req,res,next)=>{
    res.status(404).json({Message : "Route not found"})
})

// //Handling server error
// app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(500).json({Message : "Something Broken"})
// })

module.exports = app ;
