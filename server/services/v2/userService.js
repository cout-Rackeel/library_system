const knex = require('../../db');
const argon = require('argon2');
const {getAll , getBy} = require('../../utils/common');
const AppError = require('../../utils/errors/AppError');


exports.getAllUsers = async () => {
    const users = await getAll(knex , 'public.user');
    return users;
}

exports.getUserById = async (id) => {
    const where = {user_id : id};
    const user = await getBy(knex , 'public.user' , where);
    return user[0];
}

exports.getUsersBy = async (query) => {
    const user = await getBy(knex , 'public.user' , query);
    return user;
}

exports.getUserByEmail = async (email) => {
        const where = {emails : email};
        const user = await getBy(knex , 'public.user' , where);
        return user[0];
}

exports.editUserDetails = async (id , userData) => {
  
        const user = await this.getUserById(id);

        const user_data = {
            f_name: userData.f_name ?? user.f_name,
            l_name: userData.l_name ?? user.l_name,
            email: userData.email ?? user.email,
            password:user.password
        }

       const updated_user_details =  await knex('public.user').where({
            user_id : user.user_id
        }).update(user_data , '*');

        if(!updated_user_details[0]) throw new AppError("User Details not updated")

        return updated_user_details[0];

}




