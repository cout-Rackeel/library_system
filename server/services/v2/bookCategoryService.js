const knex = require('../../db');
const { getAll, getBy , generateBookCopyNumber , generateRandomNumber } = require('../../utils/common');
const AppError = require('../../utils/errors/AppError');
const ValidationError = require('../../utils/errors/ValidationError');

exports.getAllBookCategories = async () => {
        const categories = await getAll(knex , 'book_category');
        return categories;
}

exports.getAllBookCategoriesBy = async (query) => {
        const category = await getBy(knex , 'book_category' , query);
        return category;
}

exports.getAllBookCategoryById = async (id) => {
        const where = {book_id : id}
        const categories = await getBy(knex , 'book_category' , where);
        return categories;
}

exports.addBookCategory = async (body) => {

        if(!Array.isArray(body.categories)){
            const dataToAdd = {
                "book_id":body.book_id,
                "cat_id": body.categories
            }

			console.log(dataToAdd);
            const book_category = await knex('public.book_category').returning(['book_id' , 'cat_id']).insert(dataToAdd);
            return book_category;
        }
       
        return await exports.addAllBookCategories(body.book_id , body.categories);
       
}

exports.addAllBookCategories = async (book_id,categories) => {

        var dataToAdd = [];

        categories.forEach(category => {
                dataToAdd.push({book_id: book_id , cat_id:category});
        });

		console.log(dataToAdd);
        const book_categories = await knex('public.book_category').returning(['book_id' , 'cat_id']).insert(dataToAdd);
        return book_categories;
}