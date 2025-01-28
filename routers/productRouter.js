const express = require("express");
const {
  checkUserauthentication,
  checkUserSellerOrAdmin,
} = require("../middleware/checkAuthentication");
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

productRouter.get("/", getAllActiveProducts);
productRouter.get("/inactive", checkUserSellerOrAdmin, getNonActiveProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.post("/new", checkUserSellerOrAdmin, addProduct);
productRouter.put("/edit", checkUserSellerOrAdmin, editProduct);
productRouter.patch(
  "/deactivate/:id",
  checkUserSellerOrAdmin,
  deactivateProduct
);

module.exports = productRouter;
