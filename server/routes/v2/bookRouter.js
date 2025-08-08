const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, editBook, getTotalBooks, getBooksWithCategories} = require('../../controllers/v2/bookController');
const multerMiddleware = require('../../utils/multerConfig.js');


router
    .route('/')
    .get(getAllBooks)
    .post(addBook)

router
    .route('/categories')
    .get(getBooksWithCategories);

router
    .route('/:id')
    .get(getBookById)
    .patch(editBook)

router
    .route('/:id/total')
    .get(getTotalBooks)

module.exports = router;