const express = require('express');
const router = express.Router();
const { getAllBookCategories, addBookCategory, getAllBookCategoryById } = require('../../controllers/v2/bookCategoryController');

router
    .route('/')
    .get(getAllBookCategories)
    .post(addBookCategory)

router
    .route('/:id')
    .get(getAllBookCategoryById)
    


module.exports = router;