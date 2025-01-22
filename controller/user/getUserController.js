const USER_MODEL = require("../../models/userModel");
const USER_TYPE_MODEL = require("../../models/userTypeModel");

async function getUserController(req, res) {
  // console.log("hitted");
  const userid=req.body.userId;
  console.log(userid)
  await USER_MODEL.findById(userid)
  
    .then((doc) => {
      if (doc) {
                
            let { PASSWORD, USER_TYPE,DELIVERY_ADDRESSES, ...rest } = doc._doc;
            
          res.json({data:rest});
      
      } else {
        res.status(400).json("Error");
      }
    })
    .catch((err) => {
      res.status(err.status|| 500).json({message: err.message|| "internal Server Error"});
    });
}

module.exports = getUserController;
