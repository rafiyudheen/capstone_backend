const USER_MODEL = require("../../models/userModel");
const SELLER_MODEL = require("../../models/sellerModel");

async function getSellerProfile(req, res) {
    // console.log(req.query);
    const seller_id= req.query.SELLER_ID

    
    await SELLER_MODEL.findById(seller_id)
    .then(async (sellerData)=>{
        console.log(sellerData)
        if(!sellerData)
            return res.status(400).json({message:"user not available"})
        
        await USER_MODEL.findById(sellerData.USER_ID)
        .then((userData)=>{
            if(!userData._doc)
                return res.status(400).json({message:"user not available"})
            
            let { PASSWORD, USER_TYPE,DELIVERY_ADDRESSES, ...rest } = userData._doc;
            
          res.json({userData:rest,sellerData:sellerData});

        })
        .catch((errUser)=>{
            return res.status(errUser.status||400).json({message: errUser.message||"user not available"})
        })
    })
    .catch((err)=>{
        return res.status(errUser.status||400).json({message: errUser.message||"user not available"})
    })



    

}
module.exports =getSellerProfile;

