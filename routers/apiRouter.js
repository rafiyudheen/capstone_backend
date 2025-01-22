const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const sellerRouter =require("./sellerRouter")


apiRouter.use((req, res, next) => {
  console.log("app");
  next();
});



module.exports = apiRouter;
apiRouter.use("/user", userRouter);
apiRouter.use("/seller", sellerRouter);
