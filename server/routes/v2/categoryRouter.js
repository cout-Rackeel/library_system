const express = require('express');
const router = express.Router();
const {getAllCategories, getCategoryById,addCategory} = require('../../controllers/v2/categoryController');

router
    .route('/')
    .get(getAllCategories)
    .post(addCategory)

router
    .route('/:id')
    .get(getCategoryById)


module.exports = router;