require("dotenv").config();
const jwt = require('jsonwebtoken');




exports.authenticateToken =  (req , res , next) => {

    try{

        if (token == null){
            return res.status(500).json({
                    status:res.statusCode ?? 500,
                    message: "Cannot access this resource, token is not found",
            });
        }

        
        const headerToken = req.headers['authorization'].split(' ')[1];

            if(headerToken != token){
                return res.status(403).json({
                    status:res.statusCode ?? 403,
                    message: "Unexpected HTTP Authorization Value",
                });
            }


         jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
            if(err) {
                return res.status(403).json({
                    status:res.statusCode ?? 403,
                    message: err.message,
                    err : err.stack,
                    jwt: token
                });
            }

            next()
            
        });


    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            error_name: err.name,
            message: err.message,
            err : err.stack
        });
    }
    

}