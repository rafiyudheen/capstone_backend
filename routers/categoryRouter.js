const express = require("express");
const {
  checkUserauthentication,
} = require("../middleware/checkAuthentication");
const {
  createCategory,
  editCategory,
  getAllCategories,
} = require("../controller/category");

const categoryRouter = express.Router();

categoryRouter.post("/addNew", checkUserauthentication, createCategory);
categoryRouter.put("/edit", checkUserauthentication, editCategory);
categoryRouter.get("/", getAllCategories);

module.exports = categoryRouter;
