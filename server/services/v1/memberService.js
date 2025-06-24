const knex = require('../../db');
const {getAll, getBy} = require('../../utils/common');

exports.getAllMembers = async () => {
    const members = await getAll(knex , 'member');
    return members;
}

exports.getMemberById = async (id) => {
    const where = {member_id : id}
    const member = await getBy(knex , 'member', where);
    return member[0];
}