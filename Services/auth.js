const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function getUser(token){
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        return null
    }
}

async function hashPassword(password){
    return await bcrypt.hash(password, 10)
}

async function verifyPassword(password, hash){
    return bcrypt.compare(password, hash)
}

module.exports = {hashPassword, verifyPassword, getUser}

