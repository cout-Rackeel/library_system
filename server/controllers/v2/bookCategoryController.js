const { getAllBookCategories, getAllBookCategoriesBy , getAllBookCategoryById, addBookCategory} = require('../../services/v2/bookCategoryService');

exports.getAllBookCategories = async (req , res , next) => {
        try{
             var categories = null;
            
                if(Object.keys(req.query).length === 0){
                    categories = await getAllBookCategories();
                }else{
                    categories = await getAllBookCategoriesBy(req.query);
                }
    
            res.status(200).json({
                status: res.statusCode ?? 201,
                message : "Retrieved Successfully , Categories",
                body : categories, 
             });
    
        }catch(err){
            next(err)
        }
}

exports.getAllBookCategoryById = async (req , res , next) => {

      try{
           const category = await getAllBookCategoryById(req.params.id);
   
           res.status(200).json({
               status: 201,
               message : "Retrieved Category Successfully",
               body : category, 
            });
   
       }catch(err){
          next(err)
       }
}

exports.addBookCategory = async (req, res , next) => {
        try{
            const bookCategory = await addBookCategory(req.body);

             res.status(200).json({
               status: 201,
               message : "Book Category Successfully Added",
               body : bookCategory, 
            });


        }catch(err){
            next(err)
        }
}



