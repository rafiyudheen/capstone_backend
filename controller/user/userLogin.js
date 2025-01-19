const USER_MODEL = require("../../models/userModel");
const bcrypt = require("bcrypt");
const createToken = require("../../util/jwtToken");
const removeSensitiveData = require("../../util/removeSensitiveData");

async function userLogin(req, res, next) {
  const userPassword = req.body.PASSWORD;
  let USER_NAME = req.body.USER_NAME;
  await USER_MODEL.findOne({ USER_NAME }).then((doc) => {
    // console.log(doc.PASSWORD);
    if (!doc.IS_ACTIVE) {
      return res.status(401).json({ message: "User Not Active" });
    }
    bcrypt.compare(userPassword, doc.PASSWORD, async function (err, result) {
      if (err)
        return res
          .status(err.status || 500)
          .json({ message: err.message || "Some Error Occured" });

      if (result) {
        var token = createToken(doc);
        console.log(token);
      }
      if (!token)
        return res
          .status(err.status || 500)
          .json({ message: err.message || "Some Error Occured" });
      else {
        let modifiedData = removeSensitiveData(doc);

        return res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json({ data: modifiedData, message: "User Login Success" });
      }
    });
  });
}
module.exports = userLogin;
