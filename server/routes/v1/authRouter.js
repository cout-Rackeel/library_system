const express = require('express');
const router = express.Router();
const {signup , login} = require('../../controllers/v1/authController');


router
    .route('/signup')
    .post(signup)

router
    .route('/login')
    .post(login)


module.exports = router;