const express = require('express');
const router = express.Router();
const {getAllUsers , getUserById, editUserDetails, getUserByEmail} = require('../../controllers/v2/userController');
const { verifyAsLibrarian } = require('../../middleware/v2/verifyAsLibrarian');
const { checkToken } = require('../../middleware/v2/checkToken');
const { authenticateToken } = require('../../middleware/v2/authenticateToken');


router
    .route('/')
    .get(checkToken , authenticateToken , verifyAsLibrarian, getAllUsers)


router
    .route('/:id')
    .get(getUserById)
    .patch(editUserDetails)
    //.delete()



module.exports = router;