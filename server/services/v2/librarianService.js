const knex = require('../../db');
const {getAll , getBy} = require('../../utils/common');

exports.getAllLibrarians = async () => {
    const librarians = await getAll(knex, 'librarian');
    return librarians;
}

exports.getLibrarianById = async (id) =>{
    const where = {id_num : id}
    const librarian = await getBy(knex , 'librarian', where);
    return librarian[0];
}