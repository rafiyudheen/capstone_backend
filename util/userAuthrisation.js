const USER_MODEL = require("../models/userModel");
const { readToken } = require("../util/jwtToken");

async function userAuthrisation(req, res, next) {
  req.headers.userid;

  // console.log(req.cookies.access_token);

  if (!req.cookies.access_token)
    return res
      .status(406)
      .json({ message: "user Not Authorized , Please Login again" });

  const decode = readToken(req.cookies);

  if (!decode)
    return res
      .status(406)
      .json({ message: "user Not Authorized , Please Login again" });

  const { iat, exp, ...userData } = decode;
  console.log(userData);
  await USER_MODEL.findOne(userData)
    .then((doc) => {
      console.log(doc);
      if (!doc)
        return res
          .status(406)
          .json({ message: "User Authorization Failed  , Please Login again" });
      else {
        if (
          req.headers.userid == doc._id &&
          doc.USER_NAME === userData.USER_NAME &&
          doc.USER_NAME === userData.USER_NAME &&
          doc.FULL_NAME === userData.FULL_NAME &&
          doc.MOBILE_NO === userData.MOBILE_NO &&
          doc.E_MAIL &&
          userData.E_MAIL &&
          doc.PASSWORD === userData.PASSWORD
        )
          next();
        else
          return res.status(406).json({
            message: "User Authorization Failed  , Please Login again",
          });
      }
    })
    .catch((err) => {
      return res
        .status(err.status || 500)
        .json({ message: err.message || "User Authorization Failed " });
    });
}

module.exports = userAuthrisation;
