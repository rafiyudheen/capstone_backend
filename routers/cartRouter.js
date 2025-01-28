const express = require("express");
const {
  checkUserauthentication,
} = require("../middleware/checkAuthentication");
const { getUserCart, addToCart } = require("../controller/cart");

const cartRouter = express.Router();

cartRouter.get("/:userId", checkUserauthentication, getUserCart);
cartRouter.post("/addToCart", checkUserauthentication, addToCart);

module.exports = cartRouter;
