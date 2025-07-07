const express = require('express');
const router = express.Router();
const {signup , login} = require('../../controllers/v2/authController');
// const { authLoginLimiter } = require('../../middleware/v2/authLoginLimiter');
const { default: rateLimit } = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 10 minutes
    max: 5, // Limit to 5 attempts per 10 minutes
    message: { status: 429 , message: "Too many failed login attempts. Try again later." },
 });

router
    .route('/signup')
    .post(signup)

router
    .route('/login')
    .post(loginLimiter , login)


module.exports = router;