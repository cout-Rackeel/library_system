const knex = require('../../db');
const { getAll , getBy,  generateBookCopyNumber} = require('../../utils/common');

//:TODO Error Handling for each

exports.getAllCopies = async () => {
    try{
        const copies = await getAll(knex , 'public.book_copy');
        return copies;
    }catch(err){
        return err;
    }
}

exports.getAllCopiesBy = async (query) => {
    try{
        const copies = await getBy(knex , 'public.book_copy', query);
        return copies;
    }catch(err){
        return err;
    }
}

exports.addCopy = async (id , data) => {
        try{

        const copy_numbers =  await getBy(knex, 'book_copy', {book_id :id}, 'copy_num')
          

          if(data.num_copies > 0){
       
            for(i = 0; i < data.num_copies; i++){

                var body = {
                        "book_id" :id,
                        "copy_num" : null,
                        "state" : data.state
                }

                body.copy_num = generateBookCopyNumber(id);
                var count = 0;

                while(copy_numbers.includes(body.copy_num) || count < 10000){
                    body.copy_num = generateBookCopyNumber(id)
                    count++;
                }

                const copy = await knex('public.book_copy').returning(['book_id' , 'copy_num']).insert(body)

                return copy;
            }

        }else{
            return new Error("Number of copies must be above 0");
        }
        
    }catch(err){
        return err;
    }
}

exports.editCopy = async (id ,  copyNum , copyBody) => {
    try{
        const copy = await getBy(knex , 'public.book_copy', {book_id:id , copy_num:copyNum});

        if(copy){

            const copyData = {
                "copy_num" :  copyBody.copy_num ?? copy.copy_num,
                "state" : copyBody.state ?? copy.state,
            }

    
            const updatedBook = await knex('public.book_copy').where({"book_id" : id , "copy_num" : copyNum}).update(copyData , ['book_id' , 'copy_num'])
            
            return updatedBook[0];

        }else{
           //return new Error("Copy not found");
        }

    }catch(err){
        return err;
    }
}

