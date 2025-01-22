const express = require("express");
const userRouter = express.Router();
const getUserController = require("../controller/user/getUserController");
const addUser = require("../controller/user/addUserControler");
const userLogin = require("../controller/user/userLogin");
const checkUserauthentication = require("../middleware/checkAuthentication.js")
const userLogout = require("../controller/user/logout.js");
const updateUser = require("../controller/user/updateUserProfile.js");
const changeUserPassword = require("../controller/user/changePassword.js");

userRouter.post("/userProfile",checkUserauthentication ,getUserController);
userRouter.post("/logout",checkUserauthentication ,userLogout);
userRouter.post("/signUp", addUser);
userRouter.post("/login", userLogin);
userRouter.post("/updateUser",checkUserauthentication,updateUser)
userRouter.post("/changePassword",checkUserauthentication,changeUserPassword)
module.exports = userRouter;
