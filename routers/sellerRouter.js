const express = require("express");
const sellerRouter = express.Router();
const addSeller = require("../controller/seller/addSeller");
const updateSeller = require("../controller/seller/updateSeller");
const {
  checkUserauthentication,
  checkUserSellerOrAdmin,
} = require("../middleware/checkAuthentication");
const getSellerProfile = require("../controller/seller/getSellerProfile");

sellerRouter.use((req, res, next) => {
  console.log("seller");
  next();
});

sellerRouter.get("/sellerProfile", checkUserSellerOrAdmin, getSellerProfile);
sellerRouter.post("/SignUp", addSeller);
sellerRouter.post("/updateSeller", checkUserSellerOrAdmin, updateSeller);

module.exports = sellerRouter;
