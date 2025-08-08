const { getAllBorrowed , getAllBorrowedBy , addBorrowedService} = require('../../services/v2/borrowService');


exports.getAllBorrowed = async (req , res , next) => {
    try{
         var borrowed = null;

        if(Object.keys(req.query).length === 0){
            borrowed = await getAllBorrowed();
        }else{
            borrowed = await getAllBorrowedBy(req.query);
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , borrowed books records Retrieved",
            body: borrowed
         });
        

    }catch(err){
        next(err)
    }
}

exports.addBorrowed = async (req, res , next) => {
        try{
           
            const borrowRecord = await addBorrowedService(req.body);

             res.status(200).json({
               status: 201,
               message : "Book borrowed Successfully Added",
               body : borrowRecord,
            });


        }catch(err){
            next(err)
        }
}
