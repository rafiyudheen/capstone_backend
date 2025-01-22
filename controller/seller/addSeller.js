const USER_MODEL = require("../../models/userModel");
const USER_TYPES_MODEL = require("../../models/userTypeModel");
const SELLER_MODEL=require("../../models/sellerModel")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const removeSensitiveData = require("../../util/removeSensitiveData");
async function addSeller(req, res, next) {
  //let hashedPswd;
  try {
    const {
      USER_NAME,
      FULL_NAME,
      MOBILE_NO,
      E_MAIL,
      PASSWORD,
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
      !MOBILE_NO ||
      !E_MAIL ||
      !PASSWORD ||
      !ADDRESS
    )
      return res.status(400).json({ message: "Mandatory fileds missing" });

    const isMobExicst = await USER_MODEL.findOne({ MOBILE_NO });

    if (isMobExicst)
      return res
        .status(400)
        .json({ message: "Mobile Number Allready Registerd" });
    const isEmailExicst = await USER_MODEL.findOne({ E_MAIL });
    if (isEmailExicst)
      return res.status(400).json({ message: "e-mail Allready Registerd" });
    const isUserNameExist = await USER_MODEL.findOne({ USER_NAME });
    if (isUserNameExist)
      return res.status(400).json({ message: "User name all ready exicst" });

    bcrypt.hash(PASSWORD, saltRounds, async function (err, hash) {
      if (err)
        return res
          .status(err.status || 400)
          .json({ message: err.message || "Error" });
      else {


        const userType = await USER_TYPES_MODEL.findOne({ isSeller: true });
        if (!userType) return res.status(400).json({ message: "Data Error" });
        
        const userData = new USER_MODEL({
          USER_NAME: MOBILE_NO,
          FULL_NAME,
          MOBILE_NO,
          E_MAIL,
          PASSWORD: hash,
          USER_TYPE: userType._id,
          PROF_PIC,
        });
        //console.log(hashedPswd, "log");
        await userData.save();
        if(!userData)
          return res.status(500).json({ message: "Internal Server Error" });
        const sellerData=new SELLER_MODEL({
            BUSSINES_NAME,
            GST_NO,
            ADDRESS,
            CUSTOMERCARE,
            WEBSITE,
            USER_ID:userData._id
        })
        await sellerData.save();
        if(!sellerData)
          userData.deleteOne();

        let modifiedData = removeSensitiveData(userData);
        return res.json({data:{ modifiedData,sellerData},message:"Seller Saved Successfully"})
      }
    });
  } catch (err) {
    return res
      .status(err.status || 400)
      .json({ message: err.message || "Error" });
  }
}

module.exports = addSeller;
