const checkUserRole = require("../util/checkUserRole");
const userAuthrisation = require("../util/userAuthrisation");

async function checkUserauthentication(req, res, next) {
  
  userAuthrisation(req, res, next);
}

async function checkUserSellerOrAdmin(req, res, next) {
  checkUserRole(req.headers.userid).then((userTypeData) => {
    if (!userTypeData)
      return res.status(400).json({ message: "Error Occured" });
    // console.log(userTypeData);
    if (userTypeData.isAdmin || userTypeData.isSeller)
      userAuthrisation(req, res, next);
    else return res.status(400).json({ message: "User Not Admin or Seller" });
  });
  //console.log(userTypeData);
}

async function checkUserAdmin(req, res, next) {
  const userTypeData = checkUserRole(req.headers.userid);
  if (!userTypeData) return res.status(400).json({ message: "Error Occured" });

  if (userTypeData.isAdmin) userAuthrisation(req, res, next);
  else return res.status(400).json({ message: "User Not a Admin" });
}

module.exports = {
  checkUserauthentication,
  checkUserSellerOrAdmin,
  checkUserAdmin,
};
