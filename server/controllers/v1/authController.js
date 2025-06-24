const {userSignUp, userLogin} = require('../../services/v1/authService');


exports.signup = async(req , res, next) => {
    try{
    const user = await userSignUp(req.body);
    res.status(201).json({
        status: res.statusCode ?? 201,
        message : "Sign up successful, user created",
        body : user, 
     });
    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error occurred creating user",
            err : err.stack
        });
    }
}

exports.login = async(req, res, next) => {
    try{
        const user = await userLogin(req.body);

        if(!user){
            return res.status(401).json({
                status: res.statusCode ?? 401,
                message : "Invalid Credentials",
             });
        }

        if(user.name == "error"){
            return res.status(500).json({
                status: res.statusCode ?? 500,
                message : "Unexpected Database Error",
                error : user
             });
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Login successful, user logged in",
            body : user, 
         });


    }catch(err){
        res.status(500).json({
            status: 500,
            message: "Unexpected Error occurred logging in user",
            err : err.stack
        });
    }
    
    
}