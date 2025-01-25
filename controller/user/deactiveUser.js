const USER_MODEL = require("../../models/userModel");
const removeSensitiveData = require("../../util/removeSensitiveData");

async function deActiveUser(req, res) {
  const userID = req.query.userid;
  try {
    const userData = await USER_MODEL.findById(userID);
    if (!userData)
      return res.status(400).json({ message: "user data not available" });

    userData.IS_ACTIVE = false;
    try {
      await userData.save();

      const modifiedData = removeSensitiveData(userData);
      res.json({ data: modifiedData, message: "deactivation sucessfull" });
    } catch (err) {
      return res
        .status(ex.status || 500)
        .json({ message: ex.message || "internal server error" });
    }
  } catch (ex) {
    return res
      .status(ex.status || 500)
      .json({ message: ex.message || "internal server error" });
  }
}

module.exports = deActiveUser;
