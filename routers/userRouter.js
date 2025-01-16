const express=require("express")
const userRouter=express.Router();
const getUserController=require("../controller/user/getUserController")

userRouter.get("/",getUserController)


module.exports=userRouter