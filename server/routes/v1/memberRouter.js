const express = require('express');
const router = express.Router();
const {getAllMembers, getMemberById} = require('../../controllers/v1/memberController');



router
    .route('/')
    .get(getAllMembers)

router
    .route('/:id')
    .get(getMemberById)


module.exports = router;