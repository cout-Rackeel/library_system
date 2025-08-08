const knex = require('../../db');
const { getAll, getBy , generateBookCopyNumber , generateRandomNumber } = require('../../utils/common');
const AppError = require('../../utils/errors/AppError');
const ValidationError = require('../../utils/errors/ValidationError');
const {addBookCategory} = require('../v2/bookCategoryService');


exports.getAllBooks = async () => {
        const books = await getAll(knex , 'book');
        return books;
}

exports.getBookById = async (id) => {
        const where = {book_id : id}
        const book = await getBy(knex , 'book' , where);
        return book[0];
}

function generateBookID(){
    const part_1 = generateRandomNumber(3)
    const part_2 = generateRandomNumber(3)
    const part_3 = generateRandomNumber(4)

    return part_1 + "-" + part_2 + "-" + part_3
}

exports.addBook = async (bookBody) => {

        const dataToAdd = {
            "book_id": bookBody.book_id ?? generateBookID(),
            "book_nm": bookBody.book_nm,
            "publisher": bookBody.publisher,
            "author": bookBody.author,
            "img_url": bookBody.img_url,
            "trending": 0
        };

        const pattern = /^(?:\d{3}-){2}\d{4}$/ // Regex for ID

        let testConditions = true;

        let validationErrors = new ValidationError("Validation Error" , [])

        //VALIDATION CHECKS
        if(!pattern.test(dataToAdd.book_id)) {
            testConditions = false
            validationErrors.details.push('Invalid Book ID Pattern')
        };

        if(!testConditions) throw validationErrors

        const book = await knex('public.book').returning(['book_id']).insert(dataToAdd);

        if(!book) throw new AppError("Book not added" , 400);

        const bookCategoryBody = {
            "book_id": book[0].book_id,
            "categories": bookBody.categories
        }

        const bookCategories = await addBookCategory(bookCategoryBody);

        if(!bookCategories) throw new AppError("Book Categories not added" , 400);

        if(bookBody.tot_copies > 0){

            for(i = 0; i < bookBody.tot_copies; i++ ){

                const body = {
                        "book_id" : book[0].book_id,
                        "copy_num" : null,
                        "state" : "Available"
                    }

                body.copy_num = generateBookCopyNumber(book[0].book_id);

                const book2 = await knex('public.book_copy').insert(body)

                if(!book2) throw new AppError("Book Copy not added" , 400);

            }

        }

        return book[0];
        
}

exports.editBook = async (id ,  bookBody) => {

        const book = await this.getBookById(id);

        if(book){

        const bookData = {
                "book_id" : bookBody.book_id ?? book.book_id,
                "book_nm" :  bookBody.book_nm ?? book.book_nm,
                "publisher" : bookBody.publisher ?? book.publisher,
                "author" : bookBody.author ?? book.author,
            }

        const pattern = /^(?:\d{3}-){2}\d{4}$/ // Regex for ID

        let testConditions = true;

        let validationErrors = new ValidationError("Validation Error" , [])

        //VALIDATION CHECKS
        if(!pattern.test(bookData.book_id)) {
            testConditions = false
            validationErrors.details.push('Invalid Book ID Pattern')
            validationErrors.details.push(book.book_id)
        };

        if(!testConditions) throw validationErrors
            
        const updatedBook = await knex('book').where({"book_id" : book.book_id}).update(bookData , ['book_id']);

        if(!updatedBook) throw AppError("Book not updated")

        return updatedBook[0];

        }

}

exports.getAllBooksWithCategories = async () => {
    const books = await knex('book as b')
                    .join('book_category as bc', 'b.book_id' , '=' , 'bc.book_id')
                    .select('*');
  
    const bookMap = new Map();

    books.forEach(book => {
    const { cat_id , ...rest } = book;

    if (!bookMap.has(book.book_id)) {
        // Clone the book object and start a cat_ids array
        bookMap.set(book.book_id, { ...rest, categories: [cat_id] });
    } else {
        // Push additional category ID
        bookMap.get(book.book_id).categories.push(cat_id);
    }
    });

    // Convert the map back to an array
    const result = Array.from(bookMap.values());

    return result;
}

exports.getTotalBooks = async (id) => {

    const book = await this.getBookById(id);

    if(book){
            const total = await knex('book_copy').where('book_id', book.book_id).count('book_id');
            return total[0];
    }
        
}

exports.deleteBook = async (id) => {
    //:TODO 
}