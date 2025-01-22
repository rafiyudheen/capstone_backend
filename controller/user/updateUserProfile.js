const USER_MODEL = require("../../models/userModel");

const removeSensitiveData = require("../../util/removeSensitiveData");

async function updateUser(req, res, next) {
  //let hashedPswd;
  try {
    const {
      USER_ID,
      FULL_NAME,
      MOBILE_NO,
      E_MAIL,
      PROF_PIC,
    } = req.body;

    if (

      !FULL_NAME ||
      !MOBILE_NO ||
      !E_MAIL 
    )
      return res.status(400).json({ message: "Mandatory fileds missing" });

    const isMobExicst = await USER_MODEL.findOne({ MOBILE_NO, _id: { $ne: USER_ID } });

    if (isMobExicst)
      return res
        .status(400)
        .json({ message: "Mobile Number Allready Registerd" });
    const isEmailExicst = await USER_MODEL.findOne({ E_MAIL, _id: { $ne: USER_ID } });
    if (isEmailExicst)
      return res.status(400).json({ message: "e-mail Allready Registerd" });
    
       
       
         const doc=await USER_MODEL.findById(USER_ID)
         doc.FULL_NAME=FULL_NAME;
         doc.MOBILE_NO=MOBILE_NO;
         doc.E_MAIL=E_MAIL;
         doc.PROF_PIC=PROF_PIC;
        // const userData = new USER_MODEL({
        //   USER_NAME,
        //   FULL_NAME,
        //   MOBILE_NO,
        //   E_MAIL,
        //   PASSWORD: hash,
        //   USER_TYPE: userType._id,
        //   PROF_PIC,
        // });
        // //console.log(hashedPswd, "log");
        await doc.save();
        
        let modifiedData = removeSensitiveData(doc);

        return res.json({
          data: modifiedData,
          message: "User updated Succesfuly",
        
      
    });
  } catch (err) {
    return res
      .status(err.status || 400)
      .json({ message: err.message || "Error" });
  }
}

module.exports = updateUser;
