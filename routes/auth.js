const express = require('express');
const {AuthenticateUser} = require('../middlewares/auth')

const router = express.Router();
const {handleUserLogin, handleUserSignUp} = require('../controllers/authController')


router.route('/login')
    .post(handleUserLogin)

router.route('/signup')
    .post(handleUserSignUp)

module.exports = router
