const {getAllUsers , getUserById, editUserDetails, getUserByEmail} = require('../../services/v1/userService');

exports.getAllUsers =  async(req , res, next) => {
    try{
        const users = await getAllUsers();

        if(users.length == 0){
           return res.status(200).json({
                status: res.statusCode ?? 201,
                message : "Retrieved Successfully , No users",
                body : users, 
             });
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , Users",
            body : users, 
         });

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error fetching users",
            err : err.stack
        });
    }
}

exports.getUserById = async(req , res, next) => {
    try{
        const user = await getUserById(req.params.id);

        if (!user){
            return res.status(403).json({
                status: 403,
                message: "No user found",
                body : user
            });
        }

        res.status(200).json({
            status: 201,
            message : "Retrieved User Successfully",
            body : user, 
         });

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error fetching user by id",
            err : err.stack
        });
    }
}

exports.getUserByEmail = async(req , res, next) => {
    try{
        const user = await getUserByEmail(req.params.email);

        if (!user){
            return res.status(403).json({
                status: 403,
                message: "No user found",
                body : user
            });
        }

        res.status(200).json({
            status: 201,
            message : "Retrieved User Successfully",
            body : user, 
         });

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error fetching user by id",
            err : err.stack
        });
    }
}

exports.editUserDetails = async(req , res , next) => {
    try{
        const user = await editUserDetails(req.params.id , req.body);

        if (!user){
            return res.status(403).json({
                status:res.statusCode ?? 403,
                message: "No user found",
            });
        }

        res.status(200).json({
            status: res.statusCode ?? 200,
            message : "User Details updated successfully",
            body : user, 
         });       

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error updating user details",
            err : err.stack
        });
    }
}