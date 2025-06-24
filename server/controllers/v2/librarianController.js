const {getAllLibrarians , getLibrarianById} = require('../../services/v2/librarianService')

exports.getAllLibrarians = async(req , res , next) => {
    try {

    const librarians = await getAllLibrarians();

    res.status(200).json({
        status: 200,
        message : "Retrieved Successfully , Librarians Retrieved",
        body: librarians
    })

    }catch(err){
        next(err);
    }

}

exports.getLibrarianById = async(req , res, next) => {
    try{
        const librarian = await getLibrarianById(req.params.id);

        res.status(200).json({
            status: 201,
            message : "Retrieved Librarian Successfully",
            body : librarian, 
         });

    }catch(err){
        next(err);
    }
}