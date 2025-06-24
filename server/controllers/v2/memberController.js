const {getAllMembers , getMemberById} = require('../../services/v2/memberService')

exports.getAllMembers = async(req , res , next) => {
    try {

    const members = await getAllMembers();

    res.status(200).json({
        status: 200,
        message : "Retrieved Successfully , Members Retrieved",
        body: members
    })

    }catch(err){
        next(err)
    }

}

exports.getMemberById = async(req , res, next) => {
    try{
        const member = await getMemberById(req.params.id);

        res.status(200).json({
            status: 201,
            message : "Retrieved member Successfully",
            body : member, 
         });

    }catch(err){
        next(err)
    }
}