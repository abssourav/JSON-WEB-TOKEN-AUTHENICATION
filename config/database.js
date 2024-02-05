require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongodb Connected")
}).catch((err)=>{
    console.log(err.message)
    console.log("Mongodb connection failed")
    process.exit(true)
})
