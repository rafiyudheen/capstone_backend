const express = require("express");
const checkUserauthentication = require("../middleware/checkAuthentication");
const {
  getAllActiveProducts,
  getNonActiveProducts,
  addProduct,
  editProduct,
  deactivateProduct,
  getProductById,
  getProductsByCategory,
} = require("../controller/products");

const productRouter = express.Router();

productRouter.get("/active", checkUserauthentication, getAllActiveProducts);
productRouter.get("/inactive", checkUserauthentication, getNonActiveProducts);
productRouter.get("/:id", checkUserauthentication, getProductById);
productRouter.get(
  "/category/:categoryId",
  checkUserauthentication,
  getProductsByCategory
);
productRouter.post("/new", checkUserauthentication, addProduct);
productRouter.put("/edit", checkUserauthentication, editProduct);
productRouter.patch("/deactivate", checkUserauthentication, deactivateProduct);

module.exports = productRouter;
