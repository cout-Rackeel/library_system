const express = require('express');
const router = express.Router();
const {getAllCopies, addCopy, editCopy} = require('../../controllers/v2/bookCopyController');



router
    .route('/')
    .get(getAllCopies)

router
    .route('/:id')
    .post(addCopy)

router
    .route('/:id/:copy_num')
    .patch(editCopy)



module.exports = router;