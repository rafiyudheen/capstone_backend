const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function createToken(payLoad) {
  console.log(payLoad)
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

function readToken(token) {
  
  try {
    // console.log("payLoad",token);
    const decode=jwt.verify(token.access_token, secretKey);
    return decode;
  } catch (err) {
    console.log(err);
    return;
  }
  //   console.log(token);
}


module.exports = {createToken,readToken};
