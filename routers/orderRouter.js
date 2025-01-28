const express = require("express");
const orderRouter = express.Router();
const {
  checkUserauthentication,
} = require("../middleware/checkAuthentication");
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
orderRouter.put(
  "/UpdateStatus/:id",
  checkUserauthentication,
  updateOrderStatus
);
orderRouter.get(
  "/statusHistory/:id",
  checkUserauthentication,
  getStatusHistory
);
orderRouter.get(
  "/byUserID/:userId",
  checkUserauthentication,
  getOrdersByUserId
);
module.exports = orderRouter;
