const express = require('express');

const router = express.Router();
const  { handleGetAll, handleCreateNew, handleGetById, handleUpdateById, handleDeleteById } = require('../controllers/BookController');
const {AuthenticateUser} = require('../middlewares/auth')

router.route('/')
    .get(handleGetAll)
    .post(AuthenticateUser, handleCreateNew);

//req by id
router.route('/:id')
    .get(handleGetById)
    .patch(AuthenticateUser, handleUpdateById)
    .delete(AuthenticateUser, handleDeleteById);

module.exports = router; 