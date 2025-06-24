const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, editBook, getTotalBooks} = require('../../controllers/v1/bookController');


router
    .route('/')
    .get(getAllBooks)
    .post(addBook)

router
    .route('/:id')
    .get(getBookById)
    .patch(editBook)

router
    .route('/:id/total')
    .get(getTotalBooks)

module.exports = router;