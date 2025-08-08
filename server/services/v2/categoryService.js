const knex = require('../../db');
const { getAll, getBy , generateBookCopyNumber , generateRandomNumber } = require('../../utils/common');
const AppError = require('../../utils/errors/AppError');
const ValidationError = require('../../utils/errors/ValidationError');

exports.getAllCategories = async () => {
        const categories = await getAll(knex , 'category');
        return categories;
}

exports.getAllCategoryBy = async (query) => {
    const category = await getBy(knex , 'category' , query);
    return category;
}

exports.getCategoryById = async (id) => {
        const where = {cat_id : id}
        const category = await getBy(knex , 'category' , where);
        return category[0];
}

exports.getCategoryIdByName = async (name) => {
        const where = {cat_nm : name}
        const category = await getBy(knex , 'category' , where);
        return category[0];
}

exports.addCategory = async (body) => {
   

    // Implement functionality to ensure duplicates are not entered
    // const categories = await this.getAllCategories();
    // if(categories){
    //    const categoriesMap = categories.map(() => {

    // })
    // }

    const dataToAdd = {
        "cat_id": "bkcat_" + generateRandomNumber(6),
        "cat_nm": body.cat_nm
    }

    const category = await knex('public.category').returning(['cat_id']).insert(dataToAdd);
    if(!category) throw new AppError("Category not added" , 400);
    return category[0];

}