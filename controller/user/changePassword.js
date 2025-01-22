const USER_MODEL = require("../../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const removeSensitiveData = require("../../util/removeSensitiveData");

async function changeUserPassword(req,res){

    const {
        USER_NAME,
        OLD_PASSWORD,
        NEW_PASSWORD
      } = req.body;

      
      await USER_MODEL.findOne({USER_NAME})
      .then((userData)=>{
            if(!userData)
                res.status(400).json({message:"user name or password incorrect"})
            
            bcrypt.compare(OLD_PASSWORD, userData.PASSWORD, async function (err, result) {
                if (err)
                  {
                   
                  return res
                    .status(err.status || 500)
                    .json({ message: err.message || "Some Error Occured" });
                  }
          
                   
                if (result) {
                    await bcrypt.hash(NEW_PASSWORD, saltRounds, async function (err, hash) {
                          if (err)
                            return res
                              .status(err.status || 400)
                              .json({ message: err.message || "Error" });
                          if(hash) {
                            userData.PASSWORD=hash;
                            try
                            {
                            await userData.save()
                            const modifiedData=removeSensitiveData(userData)
                            res.json({data:modifiedData,message:"password changed sucessfully"}); 

                            }
                            catch(errSave){
                                return res
                              .status(errSave.status || 400)
                              .json({ message: errSave.message || "Error" });
                            }      

                          }});

                }
      });
    });

      
}


module.exports=changeUserPassword;