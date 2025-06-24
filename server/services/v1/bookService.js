const knex = require('../../db');
const { getAll, getBy , generateBookCopyNumber } = require('../../utils/common');



exports.getAllBooks = async () => {
    try{
        const books = await getAll(knex , 'book');
        return books;
    }catch(err){
        return err;
    }
}

exports.getBookById = async (id) => {
    try{
        const where = {book_id : id}
        const book = await getBy(knex , 'book' , where);
        return book[0];
    }catch(err){
        return err;
    }
}

exports.addBook = async (bookBody) => {
    try{

        const dataToAdd = {
            "book_id": bookBody.book_id,
            "book_nm": bookBody.book_nm,
            "publisher": bookBody.publisher,
            "author": bookBody.author,
        };

        const pattern = /^(?:\d{3}-){2}\d{4}$/ // Regex for ID

        const testConditions = true;

        if(!pattern.test(dataToAdd.book_id)) {testConditions = false};


        if(testConditions){

          //console.log(testConditions);

          const book = await knex('public.book').returning(['book_id']).insert(dataToAdd)

          if(bookBody.tot_copies > 0){


            for(i = 0; i < bookBody.tot_copies; i++ ){

                const body = {
                        "book_id" : book[0].book_id,
                        "copy_num" : null,
                        "state" : "Available"
                    }

                    body.copy_num = generateBookCopyNumber(book[0].book_id);

             console.log("Log: " + body.copy_num);

             const book2 = await knex('public.book_copy').insert(body)

            }

            return book[0];

        }

        }else{
            // throw new Error("PatternError").message("Invalid Book Id");
             return new Error("PatternError").message("Invalid Book Id");
        }
        
    }catch(err){
        return err;
    }
}

exports.editBook = async (id ,  bookBody) => {
    try{
        const book = await this.getBookById(id);

        if(book){

            const bookData = {
                "book_id" : bookBody.book_id ?? book.book_id,
                "book_nm" :  bookBody.book_nm ?? book.book_nm,
                "publisher" : bookBody.publisher ?? book.publisher,
                "author" : bookBody.author ?? book.author,
            }
            
            const updatedBook = await knex('book').where({"book_id" : book.book_id}).update(bookData , ['book_id']);

            return updatedBook[0];

        }

    }catch(err){
        return err;
    }
}

exports.getTotalBooks = async (id) => {
    try{
        const book = await this.getBookById(id);

        if(book){
            const total = await knex('book_copy').where('book_id', book.book_id).count('book_id').first();
            return total;
        }
        return null;
        
    }catch(err){
        return err;
    }
}

exports.deleteBook = async (id) => {
    //:TODO 
}