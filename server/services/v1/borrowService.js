const knex = require('../../db');
const { getAll , getBy } = require('../../utils/common');
const moment_init = require('moment');
const { getAllCopiesBy } = require('../v1/bookCopyService');
 

exports.getAllBorrowed = async () => {
    try{
        const borrowed = await getAll(knex , 'public.borrow');
        return borrowed;
    }catch(err){
        return err;
    }
}

exports.getAllBorrowedBy = async (query) => {
    try{
        const borrowed = await getBy(knex , 'public.borrow', query);
        return borrowed;
    }catch(err){
        return err;
    }
}

exports.addBorrowedService = async (body) => {
    try{
        if(body.member_id == null || body.book_id == null || body.borrow_dt ){
            const error = new Error("Primary key constraint not met");
            error.statusCode = 404;
            throw error;
        }

        let today_dt = moment_init().format('YYYY-MM-DD');
        let return_dt =  moment_init().add(1,'week').format('YYYY-MM-DD');


        let copy = await getAllCopiesBy({book_id: body.book_id , state:'Available'})

        if(copy[0]){

            const updatedBook = await knex('public.book_copy').where({"book_id" : copy[0].book_id , "copy_num" : copy[0].copy_num}).update({"state" : "Borrowed"} , ['book_id' , 'copy_num'])
            
            if(updatedBook[0]){

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
                            .insert(insertData)

            return addedBorrowRecord[0];

            }else{
               //return new Error("Book Copy not updated");
            }

        }else{
           //return new Error("Copy not found");
        }


    }catch(err){
        return err;
    }

     //TODO: Implement functionality to determine return date
    //TODO: Implement Functionality to ensure a member cannot borrow the same book twice
}