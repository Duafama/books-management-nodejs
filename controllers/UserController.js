const User= require('../models/userModel')
const {hashPassword} = require('../services/auth.js')

async function handleCreateNew(req, res){ 
    const { email, username, password } = req.body; 
    if (password.length < 8) return res.json( {error: "Password must contain at least 8 characters"})
    const hashedPassword = await hashPassword(password)
     try{
        const user = await User.create({
            email,
            username,
            hashedPassword
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to SignUp" });
    }
}
async function handleGetAll(req, res){
    try {
        const users = await User.find(); 
        res.json(users); //send response i.e all users
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

async function handleGetById(req, res){
    try {
        const user = await User.findById(req.params.id); 
        if (!user) return res.status(404).json({ error: "User not found" }); //client error response 404
        res.json(user); // sends response i.e specific User
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch User" }); //server error res 500
    }
}

async function handleUpdateById(req, res){
    try{
        const {email, username, password} = req.body;
        const user = await User.findByIdAndUpdate(req.params.id,
         {email, username, password},
         { new: true, runValidators: true } ); 
        if (!user) return res.status(404).json({ error: "User not found" }); //client error res
        return res.json(user);  
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to update"}); 
    }
} 
   
async function handleDeleteById(req, res){
     try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json({msg: "done"}); 
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: "Failed to delete User" });
    }
}



module.exports= {handleCreateNew, handleGetAll,  handleGetById, handleUpdateById, handleDeleteById};