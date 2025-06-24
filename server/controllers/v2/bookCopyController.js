const { getAllCopies, getAllCopiesBy , addCopy , editCopy} = require('../../services/v2/bookCopyService');


exports.getAllCopies = async (req , res , next) => {
    try{
         var copies = null;

        if(req.query == '{}'){
            copies = await getAllCopies();
        }else{
            copies = await getAllCopiesBy(req.query);
        }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , copies Retrieved",
            body: copies
         });
        

    }catch(err){
        next(err)
    }
}

exports.addCopy= async (req, res , next) => {
        try{
            const copy = await addCopy(req.params.id , req.body);

             res.status(200).json({
               status: 201,
               message : "Book Copy Successfully Added",
               body : copy, 
            });

        }catch(err){
            next(err)
        }
}

exports.editCopy = async (req, res , next) => {
        try{

            const updatedCopy = await editCopy(req.params.id, req.params.copy_num,  req.body);

             res.status(200).json({
               status: 201,
               message : "Book Copy Successfully Updated",
               body : updatedCopy, 
            });


        }catch(err){
            next(err)
        }
}
