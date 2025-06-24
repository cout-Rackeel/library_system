const knex = require('../../db');
const {getAll , getBy} = require('../../utils/common');

exports.getAllLibrarians = async () => {
    try{
        const librarians = await getAll(knex, 'librarian');
        return librarians;
    }catch(err){
        return err;
    }
    
}

exports.getLibrarianById = async (id) =>{
    const where = {id_num : id}
    const librarian = await getBy(knex , 'librarian', where);
    return librarian[0];
}