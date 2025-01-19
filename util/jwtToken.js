const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function createToken(payLoad) {
  try {
    let { USER_NAME, FULL_NAME, MOBILE_NO, E_MAIL, PASSWORD } = payLoad;
    // let new={ payLoad.USER_NAME}
    var token = jwt.sign(
      { USER_NAME, FULL_NAME, MOBILE_NO, E_MAIL, PASSWORD },
      secretKey,
      { expiresIn: "30d" }
    );
    // console.log(token);
    return token;
  } catch (err) {
    console.log(err);
    return;
  }
  //   console.log(token);
}

module.exports = createToken;
