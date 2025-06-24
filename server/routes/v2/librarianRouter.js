const express = require('express');
const router = express.Router();
const {getAllLibrarians, getLibrarianById} = require('../../controllers/v2/librarianController');



router
    .route('/')
    .get(getAllLibrarians)

router
    .route('/:id')
    .get(getLibrarianById)


module.exports = router;