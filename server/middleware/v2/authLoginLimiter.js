const { default: rateLimit } = require('express-rate-limit');

exports.authLoginLimiter = (req , res , next) => {

    const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 10 minutes
    max: 1, // Limit to 5 attempts per 10 minutes
    message: { status: "Error", message: "Too many failed login attempts. Try again later." },
    });

    next()

}