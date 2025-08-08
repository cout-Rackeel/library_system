const knex = require('../../db');
const { getAll , getBy,  generateBookCopyNumber} = require('../../utils/common');
const AppError = require('../../utils/errors/AppError');

//:TODO Error Handling for each

exports.getAllCopies = async () => {
    const copies = await getAll(knex , 'public.book_copy');
    return copies;
}

exports.getAllCopiesBy = async (query) => {
    const copies = await getBy(knex , 'public.book_copy', query);
    return copies;
}

exports.addCopy = async (id , data) => {
    
    const copy_numbers =  await getBy(knex, 'book_copy', {book_id :id}, 'copy_num');

    if(data.num_copies < 0) throw new AppError('Number of Copies must be greater than 0', 400)
       
    for(i = 0; i < data.num_copies; i++){

        var body = {
            "book_id" :id,
            "copy_num" : null,
            "state" : data.state
        }

        body.copy_num = generateBookCopyNumber(id);
        var count = 0;

        //Validation to ensure copy_num stored in the database is unique
        while(copy_numbers.includes(body.copy_num) || count < 1000){
            body.copy_num = generateBookCopyNumber(id)
            count++; // Reruns 1000 times before stop trying to stop creating a new copy_num
        }

        const copy = await knex('public.book_copy').returning(['book_id' , 'copy_num']).insert(body)

        return copy;
    }
        
}

exports.editCopy = async (id ,  copyNum , copyBody) => {

    const copy = await getBy(knex , 'public.book_copy', {book_id:id , copy_num:copyNum});

    const copyData = {
                "copy_num" :  copyBody.copy_num ?? copy.copy_num,
                "state" : copyBody.state ?? copy.state,
    }
        
    const updatedBook = await knex('public.book_copy').where({"book_id" : id , "copy_num" : copyNum}).update(copyData , ['book_id' , 'copy_num'])

    if(!updatedBook[0]) throw new AppError("Book Copy not updated")
            
    return updatedBook[0];

}

