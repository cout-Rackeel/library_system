const express = require('express');
const router = express.Router();
const { getAllBorrowed, addBorrowed } = require('../../controllers/v1/borrowController');
const { verifyAsLibrarian } = require('../../middleware/v1/verifyAsLibrarian');
const { checkToken } = require('../../middleware/v1/checkToken');
const { authenticateToken } = require('../../middleware/v1/authenticateToken');


router
    .route('/')
    .get(getAllBorrowed)
    .post(checkToken , authenticateToken , verifyAsLibrarian, addBorrowed)


// router
//     .route('/:id')
//     .get(getBorrowedById)
//     .patch(editBorrowed)

module.exports = router;