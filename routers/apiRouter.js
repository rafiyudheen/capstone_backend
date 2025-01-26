const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const sellerRouter = require("./sellerRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const cartRouter = require("./cartRouter");

apiRouter.use((req, res, next) => {
  console.log("app");
  next();
});

apiRouter.use("/user", userRouter);
apiRouter.use("/seller", sellerRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/cart", cartRouter);

module.exports = apiRouter;
