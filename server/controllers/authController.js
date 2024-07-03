const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const registerUser = async(req,res)=>{
    try {
        const {username,password} = req.body
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.json({message:'Username already exists'})
        }
        const newUser = new User({username,password});
        await newUser.save()
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET)
        res.json({token,username:newUser.username}) 
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.json({message:'Invalid Credentials'})
        } 

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({message:'Invalid Credentials'})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
        res.json({token,username:newUser.username})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser
}