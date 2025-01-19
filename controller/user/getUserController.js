const USER_MODEL = require("../../models/userModel");
const USER_TYPE_MODEL = require("../../models/userTypeModel");

async function getUserController(req, res) {
  // console.log("hitted");
  await USER_MODEL.find({})
    .then((doc) => {
      if (doc) {
        // console.log(doc);
        // let userData = { ...doc._doc };
        if (doc.length > 0) {
          let data = doc.map((user) => {
            let { PASSWORD, USER_TYPE, ...rest } = user._doc;
            return rest;
          });
          // console.log(data);
          res.json(data);
        } else res.status(400).json("No user data");
      } else {
        res.status(400).json("Error");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = getUserController;
