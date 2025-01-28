const USER_MODEL = require("../models/userModel");
const USER_TYPES_MODEL = require("../models/userTypeModel");

async function checkUserRole(userid) {
  let userTypeData = {};
  let userData = {};
  try {
    userData = await USER_MODEL.findById(userid);

    if (userData)
      try {
        userTypeData = await USER_TYPES_MODEL.findById(userData.USER_TYPE);
        return userTypeData;
      } catch {}
  } catch {}

  //return { isAdmin: userTypeData.isAdmin, isSeller: userTypeData.isSeller };
}

module.exports = checkUserRole;
