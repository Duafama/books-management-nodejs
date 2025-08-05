const User = require('../models/userModel')
const {hashPassword, verifyPassword}=require('../services/auth')
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function handleUserSignUp(req, res){ //Signup
    const { email, username, password } = req.body; 
    if (password.length < 8) return res.json( {error: "Password must contain at least 8 characters"})
    const hashedPassword = await hashPassword(password)
     try{
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })
        const token =jwt.sign(user.toJSON(), process.env.JWT_SECRET)
        return res.json({token})

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to SignUp" });
    }
}


async function handleUserLogin(req, res){ //Login
    const {email, password}=req.body
    try{
        const user= await User.findOne({email})
        if (!user) return res.json({error: "User does not exist"})
        //verifying with the hashed password stored using bcrypt 
        const verifyUser = await verifyPassword(password, user.password)
        if(!verifyUser) return res.json({error: "Invalid Password. Please try again"})

        //jwt token
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET)
        return res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Login Failed"})
    }
}

module.exports = {handleUserLogin, handleUserSignUp}