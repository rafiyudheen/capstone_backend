const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");

apiRouter.use((req, res, next) => {
  console.log("app");
  next();
});

module.exports = apiRouter;
apiRouter.use("/user", userRouter);
