const express = require("express");
const userRouter = express.Router();
const getUserController = require("../controller/user/getUserController");
const addUser = require("../controller/user/addUserControler");
const userLogin = require("../controller/user/userLogin");

userRouter.get("/userData", getUserController);
userRouter.post("/signUp", addUser);
userRouter.post("/login", userLogin);
module.exports = userRouter;
