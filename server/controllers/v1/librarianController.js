const {getAllLibrarians , getLibrarianById} = require('../../services/v1/librarianService')

exports.getAllLibrarians = async(req , res , next) => {
    try {

    const librarians = await getAllLibrarians();

    if(librarians.length === 0){
        return res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , No Librarians",
         });
    }

    res.status(200).json({
        status: 200,
        message : "Retrieved Successfully , Librarians Retrieved",
        body: librarians
    })

    }catch(err){
        res.status(500).json({
            status: 500,
            message : "Error Occurred",
            error: err
        });
    }

}

exports.getLibrarianById = async(req , res, next) => {
    try{
        const librarian = await getLibrarianById(req.params.id);

        if (!librarian){
            return res.status(403).json({
                status: 403,
                message: "No Librarian found",
            });
        }

        res.status(200).json({
            status: 201,
            message : "Retrieved Librarian Successfully",
            body : librarian, 
         });

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error fetching Librarian by id",
            err : err.stack
        });
    }
}