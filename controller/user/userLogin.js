const USER_MODEL = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../../util/jwtToken");
const removeSensitiveData = require("../../util/removeSensitiveData");

async function userLogin(req, res, next) {
  const userPassword = req.body.PASSWORD;
  let USER_NAME = req.body.USER_NAME;

  await USER_MODEL.findOne({
    $or: [{ USER_NAME }, { MOBILE_NO: req.body.USER_NAME }],
  }).then((doc) => {
    if (!doc.IS_ACTIVE) {
      return res.status(401).json({ message: "User Not Active" });
    }
    // console.log(doc);
    bcrypt.compare(userPassword, doc.PASSWORD, async function (err, result) {
      if (err) {
        return res
          .status(err.status || 500)
          .json({ message: err.message || "Error Occured" });
      }

      if (result) {
        var token = createToken(doc);
      } else {
        return res
          .status(400)
          .json({ message: "UserName or Password incorrect" });
      }
      if (!token)
        return res.status(500).json({ message: "Some Error Occured" });
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
