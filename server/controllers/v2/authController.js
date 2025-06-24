const {userSignUp, userLogin} = require('../../services/v2/authService');


exports.signup = async(req , res, next) => {
    try{
    const user = await userSignUp(req.body);
    
    res.status(201).json({
        status: res.statusCode ?? 201,
        message : "Sign up successful, user created",
        body : user, 
     });
    }catch(err){
        next(err)
    }
}

exports.login = async(req, res, next) => {
    try{
        const user = await userLogin(req.body);

        req.token = user;

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Login successful, user logged in",
            body : user, 
         });

       

    }catch(err){
       next(err)
    }
    
    
}