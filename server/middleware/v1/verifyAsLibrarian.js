require("dotenv").config();
const jwt = require('jsonwebtoken');


exports.verifyAsLibrarian = ( req, res, next) => {
    try{
        
        jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
            if(err) {
                return res.status(403).json({
                        status:res.statusCode ?? 403,
                        message: err.message,
                        err : err.stack,
                        jwt: token
                });
            }

            if(verifiedToken.user_type != "librarian"){
                return res.status(403).json({
                    status:res.statusCode ?? 403,
                    message: "Cannot access resource, invalid user role",
                });
            }

            next()
          
        });

    }catch(err){
        res.status(403).json({
            status:res.statusCode ?? 403,
            message: err.message,
            err : err
        });
    }
}