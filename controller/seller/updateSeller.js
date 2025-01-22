const USER_MODEL = require("../../models/userModel");
const SELLER_MODEL=require("../../models/sellerModel")
const removeSensitiveData = require("../../util/removeSensitiveData");
async function updateSeller(req, res, next) {
  //let hashedPswd;
  try {
    const {
      SELLER_ID,
      FULL_NAME,
      E_MAIL,
      PROF_PIC,
      BUSSINES_NAME,
      GST_NO,
      ADDRESS,
      CUSTOMERCARE,
      WEBSITE
    } = req.body;

    if (
      !BUSSINES_NAME ||
      !FULL_NAME ||
      !E_MAIL ||
      !ADDRESS
    )
      return res.status(400).json({ message: "Mandatory fileds missing" });
      
    
      const sellerData=await  SELLER_MODEL.findById(SELLER_ID)

      console.log("SELLER_ID",SELLER_ID)
      if(!sellerData)
        return res.status(500).json({ message: "Internal Server Error" });

      console.log(sellerData)

      const userData=await USER_MODEL.findById(sellerData.USER_ID)
    
      if(!userData)
        return res.status(500).json({ message: "Internal Server Error" });
    
      
      

      const isEmailExicst = await USER_MODEL.findOne({ E_MAIL,_id: { $ne: userData._id } });
      if (isEmailExicst)
        return res.status(400).json({ message: "e-mail Allready Registerd" });


      sellerData.BUSSINES_NAME=BUSSINES_NAME,
      sellerData.GST_NO=GST_NO,
      sellerData.ADDRESS=ADDRESS,
      sellerData.CUSTOMERCARE=CUSTOMERCARE,
      sellerData.WEBSITE=WEBSITE
      

      userData.FULL_NAME=FULL_NAME;
      userData.E_MAIL=E_MAIL;
      userData.PROF_PIC=PROF_PIC;
        

    try{

        await sellerData.save();
    }
    catch(err1){
        return res.status(err1.status||500).json({ message: err1.message|| "Internal Server Error" });
    }
    try
    {
        await userData.save();
    }
    catch(err1)
    {
        return res.status(err1.status||500).json({ message: err1.message|| "Internal Server Error" });
    }




    
    
    //console.log(hashedPswd, "log");
   
    

    let modifiedData = removeSensitiveData(userData);
    return res.json({data:{ userData:modifiedData,sellerData},message:"Seller Saved Successfully"})
    
  } catch (err) {
    return res
      .status(err.status || 400)
      .json({ message: err.message || "Error" });
  }
}

module.exports = updateSeller;
