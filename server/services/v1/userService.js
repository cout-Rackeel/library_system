const knex = require('../../db');
const argon = require('argon2');
const {getAll , getBy} = require('../../utils/common');


exports.getAllUsers = async () => {
    const users = await getAll(knex , 'public.user');
    return users;
}

exports.getUserById = async (id) => {
    const where = {user_id : id};
    const user = await getBy(knex , 'public.user' , where);
    return user[0];
}

exports.getUserByEmail = async (email) => {
    try{
        const where = {emails : email};
        const user = await getBy(knex , 'public.user' , where);
        return user[0];
    }catch(err){
        return err;
    }
    
}

exports.editUserDetails = async (id , userData) => {
    try{
        
        const user = await this.getUserById(id);

        if(!user){
            return user[0];
        }

        const user_data = {
            f_name: userData.f_name ?? user.f_name,
            l_name: userData.l_name ?? user.l_name,
            email: userData.email ?? user.email,
            password: await argon.hash(userData.password) ?? user.password
        }

       const updated_user_details =  await knex('public.user').where({
            user_id : user.user_id
        }).update(user_data , '*');

        return updated_user_details[0];

    }catch(err){
        return err;
    }
}




