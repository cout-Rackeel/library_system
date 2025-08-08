
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('librarian').del()
  await knex('member').del()
  await knex('public.user').del()

  const argon = require('argon2');

  const users = [
        {user_id: "123456789125", f_name: 'rackeel' , l_name:'brooks', email:'racky2@gmail.com', password: await argon.hash('password123'), user_type:"librarian"},
        {user_id: "123456789126", f_name: 'Taquan' , l_name:'James', email:'taquany@gmail.com', password: await argon.hash('password123'), user_type:"member"},
  ]

  const insertedUsers = await knex('public.user').insert(users).returning(['user_id', 'user_type']);
  var librarianUsers = [];
  var memberUsers = [];

  insertedUsers.forEach(user => {
    if(user.user_type == 'librarian'){
      librarianUsers.push({id_num:user.user_id})
    }else if(user.user_type == 'member'){
      memberUsers.push({member_id:user.user_id})
    }
  });

  if(librarianUsers.length > 0) {
      await knex('librarian').insert(librarianUsers);
    }

  if(memberUsers.length > 0) {
      await knex('member').insert(memberUsers);
    }
};
