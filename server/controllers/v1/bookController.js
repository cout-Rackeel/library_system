const { getAllBooks, getBookById, addBook, editBook, getTotalBooks} = require('../../services/v1/bookService');

exports.getAllBooks = async (req , res , next) => {
    try{
        const books = await getAllBooks();

        if( books.length === 0){
            return res.status(200).json({
                status: res.statusCode ?? 201,
                message : "Retrieved Successfully , No Books found",
             });
        }
            res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , Books Retrieved",
            body: books
         });

    }catch(err){
        res.status(500).json({
            status: 500,
            message : "Error Occurred",
            error: err
        });
    }
}

exports.getBookById = async (req , res , next) => {

      try{
           const book = await getBookById(req.params.id);
   
           if (!book){
               return res.status(403).json({
                   status: 403,
                   message: "No Book found",
               });
           }
   
           res.status(200).json({
               status: 201,
               message : "Retrieved Book Successfully",
               body : book, 
            });
   
       }catch(err){
           res.status(500).json({
               status:res.statusCode ?? 500,
               message: "Unexpected Error fetching Book by id",
               err : err.stack
           });
       }
}

exports.addBook = async (req, res , next) => {
        try{
            const book = await addBook(req.body);

            // if(!book){
            //     return res.status(403).json({
            //        status: 403,
            //        message: "Book not added",
            //    });
            // }

            if(book instanceof Error){
                 return res.status(500).json({
                   status: 500,
                   temp: "Invalid Book ID Pattern",
                   message: book,
               });
            }

             res.status(200).json({
               status: 201,
               message : "Book Successfully Added",
               body : book, 
            });


        }catch(err){

            let message = "Unexpected Error inserting Book";

            if(err.code = "23505"){
                message = "Error insering book, duplicate ID found in database table"
            }

            res.status(500).json({
               status:res.statusCode ?? 500,
               message: message,
               err: err,
               stack : err.stack
           });
        }
}

exports.editBook = async (req, res , next) => {
        try{
            const updatedBook = await editBook(req.params.id , req.body);


            if(updatedBook instanceof Error){
                 return res.status(500).json({
                   status: 500,
                   temp: "Invalid Book ID Pattern",
                   message: book,
               });
            }

             if (!updatedBook){
               return res.status(403).json({
                   status: 403,
                   message: "No Book found",
               });
           }

             res.status(200).json({
               status: 201,
               message : "Book Successfully Updated",
               body : updatedBook, 
            });


        }catch(err){

            res.status(500).json({
               status:res.statusCode ?? 500,
               message: message,
               err: err,
               stack : err.stack
           });
        }
}

exports.getTotalBooks = async (req, res, next) => {
    try {
        const total = await getTotalBooks(req.params.id);

        if(!total){
            return res.status(403).json({
                   status: 403,
                   message: "No Book found with that id",
                   data: req.params.id
            });
        }

        res.status(200).json({
               status: 201,
               message : "Book Successfully Counted",
               id: req.params.id,
               body : total, 
            });



    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: message,
            err: err,
            stack : err.stack
        });
    }
}

