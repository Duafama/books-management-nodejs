const express = require('express');

const router = express.Router();
const  {handleCreateNew, handleGetAll, handleGetById, handleUpdateById, handleDeleteById, } = require('../controllers/UserController');
const {AuthenticateUser} = require('../middlewares/auth')

router.route('/')
    .get(handleGetAll)
    .post(AuthenticateUser, handleCreateNew) 

//req by id
router.route('/:id')
    .get(AuthenticateUser, handleGetById)
    .patch(AuthenticateUser, handleUpdateById)
    .delete(AuthenticateUser, handleDeleteById);

module.exports = router; 