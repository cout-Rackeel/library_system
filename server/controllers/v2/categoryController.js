const { getAllCategories,  getAllCategoryBy, getCategoryById, addCategory} = require('../../services/v2/categoryService');

// exports.getAllCategories = async (req , res , next) => {
//     try{
//         const categories = await getAllCategories();

//             res.status(200).json({
//             status: res.statusCode ?? 201,
//             message : "Retrieved Successfully , Categories Retrieved",
//             body: categories
//          });

//     }catch(err){
//         next(err)
//     }
// }

exports.getAllCategories =  async(req , res, next) => {
    try{
         var categories = null;
        
         categories = await getAllCategories();
            // if(Object.keys(req.query).length === 0){
            //     categories = await getAllCategories();
            // }else{
            //     categories = await getAllCategoryBy(req.query);
            // }

        res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , Categories",
            body : categories, 
         });

    }catch(err){
        next(err)
    }
}

exports.getCategoryById = async (req , res , next) => {

      try{
           const category = await getCategoryById(req.params.id);
   
           res.status(200).json({
               status: 201,
               message : "Retrieved Category Successfully",
               body : category, 
            });
   
       }catch(err){
          next(err)
       }
}

exports.addCategory = async (req, res , next) => {
        try{
            const category = await addCategory(req.body);

             res.status(200).json({
               status: 201,
               message : "Category Successfully Added",
               body : category, 
            });

        }catch(err){
            next(err)
        }
}


