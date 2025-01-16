const USER_MODEL=require("../../models/userModel")
const USER_TYPE_MODEL=require("../../models/userTypeModel")

async function getUserController(req,res){
    USER_MODEL.find({})
    .then((doc)=>{
        if(doc){
            if(doc.length>0)
                res.json(doc)
            else
                res.status(400).json("No user data");

        }
        else
        {
            res.status(400).json("Error");
        }
    })
    .catch((err)=>{
        res.status(500).json(err)
    })


}

module.exports=getUserController