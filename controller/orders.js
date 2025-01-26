const ORDER_MODEL = require("../models/orderModel");
const USER_MODEL = require("../models/userModel");
const PRODUCT_MODEL = require("../models/productModel");

// Add Order
const addOrder = async (req, res) => {
  try {
    const {
      USER_ID,
      ITEMS,
      TOTAL_AMOUNT,
      DELIVERY_ADDRES,
      PAYMENT_MODE,
      TRANSACTION_REF_ID,
    } = req.body;

    const user = await USER_MODEL.findById(USER_ID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (let item of ITEMS) {
      const product = await PRODUCT_MODEL.findById(item.PRODUCT_ID);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.PRODUCT_ID} not found` });
      }
    }

    const newOrder = new ORDER_MODEL({
      USER_ID,
      ITEMS,
      TOTAL_AMOUNT,
      DELIVERY_ADDRES,
      PAYMENT_MODE,
      TRANSACTION_REF_ID,
      STATUS: [
        {
          DATE_TIME: new Date(),
          CURRENT_STATUS: "Order Placed",
          REMARK: "Order has been placed successfully",
          IS_DELIVERED: false,
        },
      ],
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const { ITEMS, DELIVERY_ADDRES, PAYMENT_MODE, TRANSACTION_REF_ID } =
      req.body;

    const order = await ORDER_MODEL.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.STATUS.length > 1) {
      return res.status(400).json({
        message: "Edit not possible: Order status has already been updated.",
      });
    }

    order.ITEMS = ITEMS || order.ITEMS;
    order.DELIVERY_ADDRESS = DELIVERY_ADDRESS || order.DELIVERY_ADDRESS;
    order.PAYMENT_MODE = PAYMENT_MODE || order.PAYMENT_MODE;
    order.TRANSACTION_REF_ID = TRANSACTION_REF_ID || order.TRANSACTION_REF_ID;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await ORDER_MODEL.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await ORDER_MODEL.find()
      .populate("USER_ID", "name email")
      .populate("ITEMS.PRODUCT_ID", "name price");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await ORDER_MODEL.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { CURRENT_STATUS, REMARK, IS_DELIVERED } = req.body;

    order.STATUS.push({
      DATE_TIME: new Date(),
      CURRENT_STATUS,
      REMARK,
      IS_DELIVERED,
    });

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getStatusHistory = async (req, res) => {
  try {
    const order = await ORDER_MODEL.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order.STATUS);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await ORDER_MODEL.find({ USER_ID: userId }).populate(
      "ITEMS.PRODUCT_ID",
      "name"
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addOrder,
  editOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getStatusHistory,
  getOrdersByUserId,
};
