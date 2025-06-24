const { getAllCopies, getAllCopiesBy , addCopy , editCopy} = require('../../services/v1/bookCopyService');


exports.getAllCopies = async (req , res , next) => {
    try{
         var copies = null;

        if(req.query == '{}'){
            copies = await getAllCopies();
        }else{
            copies = await getAllCopiesBy(req.query);
        }

        if( copies.length === 0){
            return res.status(403).json({
                    status: res.statusCode ?? 201,
                    message : "Retrieved Successfully , No copies found",
            });
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , copies Retrieved",
            body: copies
         });
        

    }catch(err){
        res.status(500).json({
            status: 500,
            message : "Error Occurred",
            error: err
        });
    }
}

exports.addCopy= async (req, res , next) => {
        try{
            const copy = await addCopy(req.params.id , req.body);

            //  if(copy instanceof Error){
            //      return res.status(500).json({
            //        status: 500,
            //        temp: "Unexpected error occured",
            //        message: copy,
            //    });
            // }

             res.status(200).json({
               status: 201,
               message : "Book Copy Successfully Added",
               body : copy, 
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

exports.editCopy = async (req, res , next) => {
        try{

            const updatedCopy = await editCopy(req.params.id, req.params.copy_num,  req.body);

            // if(updatedCopy instanceof Error){
            //      return res.status(500).json({
            //        status: 500,
            //        temp: "Invalid Book Copy ID Pattern",
            //        message: book,
            //    });
            // }

             if (!updatedCopy){
               return res.status(403).json({
                   status: 403,
                   message: "No Book Copy found",
               });
           }

             res.status(200).json({
               status: 201,
               message : "Book Copy Successfully Updated",
               body : updatedCopy, 
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
