const express = require("express");
const checkUserauthentication = require("../middleware/checkAuthentication");
const {
  createCategory,
  editCategory,
  getAllCategories,
} = require("../controller/category");

const categoryRouter = express.Router();

categoryRouter.post("/category", checkUserauthentication, createCategory);
categoryRouter.put("/category/:id", checkUserauthentication, editCategory);
categoryRouter.get("/categories", checkUserauthentication, getAllCategories);

module.exports = categoryRouter;
