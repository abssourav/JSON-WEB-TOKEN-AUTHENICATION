require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10

const User = require("../models/user.model");


exports.registerUser = async (req,res) => {

    try { 
        const user =await User.findOne({username:req.body.username})
    
        if(user) return res.status(400).send({message: "User already exist"})
    
        bcrypt.hash(req.body.password,saltRounds,async (err,hash)=>{
            const newUser = new User({
                username : req.body.username,
                password : hash
            })
    
            await newUser.save()
            .then((user)=>{
                res.send({
                    success : true,
                    message:"User Registration Successfull",
                    user:{
                        id : user._id,
                        username :user.username
                    }
                })
            }).catch((err)=>{
                res.send({
                    success : false,
                    message :"User Registration Failed",
                    error : err
                })
            })
        })
    } catch (error) {
        res.status(500).send(error.message)
    }

};





exports.loginUser = async (req,res)=>{
    const user =await User.findOne({username:req.body.username})
    if(!user){
        return res.status(404).send({
            success:false,
            message : "User Not Found"
        })
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(401).send({
            success:false,
            message : "Password Incorrect"
        })
    }


    const payload = {           //seccessfully login korar somoy login route a token generate korte hobe
        id : user._id,
        username :user.username
    }

    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(payload, process.env.SERCRET_KEY , {
        expiresIn:'7d'
    })

    res.status(200).send({
        success:true,
        message : "User logged in successfully",
        token : "Bearer " + token
    })

}

exports.userProfile = (req,res)=>{
    console.log(req.username)
    console.log(req.id)
    res.status(200).send("Profile page")
}