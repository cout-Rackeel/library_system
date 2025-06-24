const {getAllUsers , getUserById, editUserDetails, getUserByEmail, getUsersBy} = require('../../services/v2/userService');

exports.getAllUsers =  async(req , res, next) => {
    try{
         var users = null;
        
            if(req.query == '{}'){
                    users = await getAllUsers();
            }else{
                    users = await getUsersBy(req.query);
            }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , Users",
            body : users, 
         });

    }catch(err){
        next(err)
    }
}

exports.getUserById = async(req , res, next) => {
    try{
        const user = await getUserById(req.params.id);

        res.status(200).json({
            status: 201,
            message : "Retrieved User Successfully",
            body : user, 
         });

    }catch(err){
        next(err)
    }
}

exports.editUserDetails = async(req , res , next) => {
    try{
        const user = await editUserDetails(req.params.id , req.body);

        res.status(200).json({
            status: res.statusCode ?? 200,
            message : "User Details updated successfully",
            body : user, 
         });       

    }catch(err){
        next(err)
    }
}