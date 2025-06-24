const express = require('express');
const router = express.Router();
const {getAllUsers , getUserById, editUserDetails, getUserByEmail} = require('../../controllers/v1/userController');
const { verifyAsLibrarian } = require('../../middleware/v1/verifyAsLibrarian');
const { checkToken } = require('../../middleware/v1/checkToken');
const { authenticateToken } = require('../../middleware/v1/authenticateToken');


router
    .route('/')
    .get(checkToken , authenticateToken , verifyAsLibrarian, getAllUsers)


router
    .route('/:id')
    .get(getUserById)
    .patch(editUserDetails)
    //.delete()

router
    .route('/email/:email')
    .get(getUserByEmail)


module.exports = router;