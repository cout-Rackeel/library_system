const { getAllBorrowed , getAllBorrowedBy , addBorrowedService} = require('../../services/v1/borrowService');


exports.getAllBorrowed = async (req , res , next) => {
    try{
         var borrowed = null;

        if(req.query == '{}'){
            borrowed = await getAllBorrowed();
        }else{
            borrowed = await getAllBorrowedBy(req.query);
        }

        if( borrowed.length === 0){
            return res.status(403).json({
                    status: res.statusCode ?? 201,
                    message : "Retrieved Successfully , No borrowed found",
            });
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , borrowed books records Retrieved",
            body: borrowed
         });
        

    }catch(err){
        res.status(500).json({
            status: 500,
            message : "Error Occurred",
            error: err
        });
    }
}

exports.addBorrowed = async (req, res , next) => {
        try{
           
            let borrowRecord = await addBorrowedService(req.body);

            //  if(borrowRecord instanceof Error){
            //      return res.status(500).json({
            //        status: 500,
            //        temp: "Unexpected error occured",
            //        message: borrowRecord,
            //    });
            // }

             res.status(200).json({
               status: 201,
               message : "Book borrowed Successfully Added",
               body : borrowRecord,
               test:"v"
            });


        }catch(err){

            let message = "Unexpected Error borrowing book";

            if(err.code == "23505"){
                message = "Error borrowing book, duplicate ID found in database table"
            }

            res.status(500).json({
               status:res.statusCode ?? 500,
               message: message,
               err: err,
               stack : err.stack
           });
        }
}
