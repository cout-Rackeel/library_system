/*
    Services are the workers in the api that complete a specific tasks for an api resource
    , these tasks come together to fulfill a specific objective within the controller
    
*/
require("dotenv").config();
const knex = require('../../db');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const AppError = require("../../utils/errors/AppError");
const ValidationError = require("../../utils/errors/ValidationError");

exports.userSignUp = async (userData) => {
 
        // UserData will be the request.body in which this service is called
        const userBody = {
            user_id: userData.user_id,
            f_name: userData.f_name,
            l_name: userData.l_name,
            email: userData.email,
            password: await argon.hash(userData.password),
            dt_joined: new Date(),
            user_type : userData.user_type
        };

        if(userBody.user_id == null || userBody.user_id == ''){
            throw new ValidationError("User cannot be add" , ['User name is null']);
        }

        const deliverable = await knex('public.user').insert(userBody).returning(['user_id','user_type']);

        if(!deliverable) throw new AppError('User not added' , 400)

        switch(deliverable[0].user_type){
                case 'librarian':
                   const librarianInsert = await knex('librarian').insert({id_num : deliverable[0].user_id})

                   if(!librarianInsert){
                        console.error('Error adding librarian:', err);
                        throw new AppError('Librarian not added', 400);
                   }

                   console.log("Added to librarian relation");
                break;

                case 'member':

                    const memberInsert = await knex('member').insert({member_id : deliverable[0].user_id})

                   if(!memberInsert){
                        console.error('Error adding member:', err);
                        throw new AppError('Member not added', 400);
                   }

                   console.log("Added to Member relation");
                    
                break;

                default:
                break;
        }
         
        return deliverable[0];

}
    

exports.userLogin = async (userData) => {

        const response = await knex("public.user")
        .where({
            "email" : userData.email
        })
        .select("user_id" ,"password", "user_type")

        const invalidCredentials = new AppError("Invalid Credentials" , 400);
     
        if(!response[0]) throw invalidCredentials;

        const is_password_valid = await argon.verify(response[0].password , userData.password);

        if(!is_password_valid) throw invalidCredentials;
                
        const payload = {"sub" : response[0].user_id, "user_type":  response[0].user_type};

        token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'5m'} );

        return token;
   
}