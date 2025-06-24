const {getAllMembers , getMemberById} = require('../../services/v1/memberService')

exports.getAllMembers = async(req , res , next) => {
    try {

    const members = await getAllMembers();

    if(members.length === 0){
        return res.status(200).json({
            status: res.statusCode ?? 201,
            message : "Retrieved Successfully , No members",
         });
    }

    res.status(200).json({
        status: 200,
        message : "Retrieved Successfully , Members Retrieved",
        body: members
    })

    }catch(err){
        res.status(500).json({
            status: 500,
            message : "Error Occurred",
            error: err
        });
    }

}

exports.getMemberById = async(req , res, next) => {
    try{
        const member = await getMemberById(req.params.id);

        if (!member){
            return res.status(403).json({
                status: 403,
                message: "No member found",
            });
        }

        res.status(200).json({
            status: 201,
            message : "Retrieved member Successfully",
            body : member, 
         });

    }catch(err){
        res.status(500).json({
            status:res.statusCode ?? 500,
            message: "Unexpected Error fetching member by id",
            err : err.stack
        });
    }
}