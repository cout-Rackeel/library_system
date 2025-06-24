const express = require('express');
const router = express.Router();
const { getAllBorrowed, addBorrowed } = require('../../controllers/v2/borrowController');
const { verifyAsLibrarian } = require('../../middleware/v2/verifyAsLibrarian');
const { checkToken } = require('../../middleware/v2/checkToken');
const { authenticateToken } = require('../../middleware/v2/authenticateToken');


router
    .route('/')
    .get(getAllBorrowed)
    .post(checkToken , authenticateToken , verifyAsLibrarian, addBorrowed)


// router
//     .route('/:id')
//     .get(getBorrowedById)
//     .patch(editBorrowed)

module.exports = router;