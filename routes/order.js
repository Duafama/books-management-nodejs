const express = require('express')
const {handleDeleteOrder, handleGetAll, handleNewOrder, handleUpdateOrder, handleGetById} = require('../controllers/orderController')

const router = express.Router()
const {AuthenticateUser}= require('../middlewares/auth')

router.route('/')
    .get(AuthenticateUser, handleGetAll)
    .post(AuthenticateUser, handleNewOrder)

router.route('/:id')
    .get(AuthenticateUser, handleGetById)
    .patch(AuthenticateUser, handleUpdateOrder)
    .delete(AuthenticateUser, handleDeleteOrder)

module.exports = router