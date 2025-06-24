const knex = require('../../db');
const { getAll , getBy } = require('../../utils/common');
const moment_init = require('moment');
const { getAllCopiesBy } = require('../v2/bookCopyService');
const AppError = require('../../utils/errors/AppError');
const ValidationError = require('../../utils/errors/ValidationError');
 

exports.getAllBorrowed = async () => {
   const borrowed = await getAll(knex , 'public.borrow');
   return borrowed;
}

exports.getAllBorrowedBy = async (query) => {
    const borrowed = await getBy(knex , 'public.borrow', query);
    return borrowed;
}

exports.addBorrowedService = async (body) => {

        let validationErrors = new ValidationError("Validation Error")
    
        if(body.member_id == null || body.book_id == null || body.borrow_dt == null ){
            body.member_id != null ? validationErrors.details.push("Member Id is required") : null;
            body.book_id != null ? validationErrors.details.push("Book Id is required") : null;
            body.borrow_dt != null ? validationErrors.details.push("Borrowed Date is required") : null;

            throw new validationErrors
        }

        let today_dt = moment_init().format('YYYY-MM-DD');
        let return_dt =  moment_init().add(1,'week').format('YYYY-MM-DD');

        let copy = await getAllCopiesBy({book_id: body.book_id , state:'Available'})

        const updatedBook = await knex('public.book_copy').where({"book_id" : copy[0].book_id , "copy_num" : copy[0].copy_num}).update({"state" : "Borrowed"} , ['book_id' , 'copy_num'])

        if(!updatedBook[0]) throw new AppError("Book copy status not updated" , 404)
            
        let insertData = {
            member_id: body.member_id,
            book_id: body.book_id,
            copy_num: copy[0].copy_num,
            borrow_dt: today_dt,
            set_return_dt: return_dt,
            act_return_dt: null,
            librarian_id : body.librarian_id,
        }

        const addedBorrowRecord = await knex('borrow')
                            .returning(['member_id' , 'book_id', 'copy_num', ' borrow_dt'])
                            .insert(insertData);

        if(!addedBorrowRecord[0]) throw new AppError("Borrowed Book not record")

        return addedBorrowRecord[0];

    }


//TODO: Implement functionality to determine return date
//TODO: Implement Functionality to ensure a member cannot borrow the same book twice
