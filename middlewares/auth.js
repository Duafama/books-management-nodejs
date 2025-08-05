const {getUser} = require('../services/auth')

require('dotenv').config()

async function AuthenticateUser(req, res, next){
    const authHeader= await req.headers['authorization']
    if(!authHeader) return res.json({msg: 'User not logged in'})
    const token = authHeader.split('Bearer ')[1]
    // console.log(token)
    const user =  getUser(token)
    // console.log(user)
    if(!user) return res.json({msg: 'Incorrect token'})
    req.user = user
    next()
}


module.exports ={AuthenticateUser}



