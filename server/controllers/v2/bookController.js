const { getAllBooks, getBookById, addBook, editBook, getTotalBooks} = require('../../services/v2/bookService');

exports.getAllBooks = async (req , res , next) => {
    try{
        const books = await getAllBooks();

            res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , Books Retrieved",
            body: books
         });

    }catch(err){
        next(err)
    }
}

exports.getBookById = async (req , res , next) => {

      try{
           const book = await getBookById(req.params.id);
   
           res.status(200).json({
               status: 201,
               message : "Retrieved Book Successfully",
               body : book, 
            });
   
       }catch(err){
          next(err)
       }
}

exports.addBook = async (req, res , next) => {
        try{
            const book = await addBook(req.body);

             res.status(200).json({
               status: 201,
               message : "Book Successfully Added",
               body : book, 
            });


        }catch(err){
            next(err)
        }
}

exports.editBook = async (req, res , next) => {
        try{
            const updatedBook = await editBook(req.params.id , req.body);

             res.status(200).json({
               status: 201,
               message : "Book Successfully Updated",
               body : updatedBook, 
            });

        }catch(err){
           next(err)
        }
}

exports.getTotalBooks = async (req, res, next) => {
    try {
        const total = await getTotalBooks(req.params.id);

        res.status(200).json({
               status: 201,
               message : "Book Successfully Counted",
               id: req.params.id,
               body : total, 
            });

    }catch(err){
       next(err)
    }
}

