/*
    Services are the workers in the api that complete a specific tasks for an api resource
    , these tasks come together to fulfill a specific objective within the controller
    
*/
require("dotenv").config();
const knex = require('../../db');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

exports.userSignUp = async (userData) => {
    try {
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
        
        const deliverable = await knex('public.user').insert(userBody).returning(['user_id','user_type']).then(results => {
            switch(results[0].user_type){
                case 'librarian':
                    knex('librarian').insert({id_num : results[0].user_id})
                    .then(results => {
                        console.log("Added to librarian relation");
                    })
                    .catch(err => {
                        console.error('Error adding librarian:', err);
                        return err
                    });
                break;

                case 'member':
                    knex('member').insert({member_id : results[0].user_id})
                    .then(results => {
                        console.log("Added to member relation");
                    })
                    .catch(err => {
                        console.error('Error adding member:', err);
                        return err
                    });
                break;

                default:
                break;
            }
        })
        .catch(err => {
            console.error('Error inserting user:', err);
            return err
        });
       
        return deliverable;

    }catch(err){
        
    }
    
   
}

exports.userLogin = async (userData) => {
    try{

        var response = await knex("public.user")
        .where({
            "email" : userData.email
        })
        .select("user_id" ,"password", "user_type")

     
        if(response[0]){
            var is_password_valid = await argon.verify(response[0].password , userData.password);
            if(is_password_valid){
                
                var payload = {"sub" : response[0].user_id, "user_type":  response[0].user_type};

                token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'5m'} );

                return token;

            }else{
                return null;
            }
        }

        return response[0];
        
    }catch(err){
       return err;
    }
}