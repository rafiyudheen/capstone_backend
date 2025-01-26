const express = require("express");
const orderRouter = express.Router();
const checkUserauthentication = require("../middleware/checkAuthentication");
const {
  addOrder,
  editOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getStatusHistory,
  getOrdersByUserId,
} = require("../controller/orders");

orderRouter.post("/add", checkUserauthentication, addOrder);
orderRouter.put("/edit/:id", checkUserauthentication, editOrder);
orderRouter.get("/", checkUserauthentication, getAllOrders);
orderRouter.get("/:id", checkUserauthentication, getOrderById);
orderRouter.put("/status/:id", checkUserauthentication, updateOrderStatus);
orderRouter.get(
  "/status-history/:id",
  checkUserauthentication,
  getStatusHistory
);
orderRouter.get("/byUserID", checkUserauthentication, getOrdersByUserId);
module.exports = orderRouter;
