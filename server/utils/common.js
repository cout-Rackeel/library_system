const AppError = require("./errors/AppError");

exports.getAll = async ( knex ,tableName , selectSQL = '*') => {
    const result = await knex(tableName).select(selectSQL);
    if(!result) throw new AppError(`Resources not retrieved` , 404)
    return result;
}

exports.getBy = async (knex ,tableName , whereCriteria , selectSQL = '*') => {
    const result = await knex(tableName).where(whereCriteria).select(selectSQL);
    if(!result) throw new AppError("Resource not found" , 404)
    if(result.length == 0) throw new AppError("Resource not found" , 404)
    return result;
}

exports.generateRandomNumber = (length) => {

    if (length <= 0) {
        throw  new AppError(`Invalid length, must be greater than 0` , 400);
    }

    const min = 10 ** (length - 1); // Minimum value for the given length
    const max = 10 ** length - 1;   // Maximum value for the given length

    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}

exports.generateBookCopyNumber = (bookId) => {

    let idPart = bookId.split("-")[2]

    let copyNumber = "CY"+ "-" + idPart + "-" + this.generateRandomNumber(4);

    return copyNumber
    
}