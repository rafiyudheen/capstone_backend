const mongoose = require("mongoose");
const USER_MODEL = require("../models/userModel");
const PRODUCT_MODEL = require("./productModel");

const Schema = mongoose.Schema;
const ORDERS_SCHEMA = new Schema({
  USER_ID: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
  },
  ITEMS: [
    {
      PRODUCT_ID: {
        type: Schema.Types.ObjectId,
        ref: PRODUCT_MODEL,
        required: true,
      },
      SN: {
        type: Number,
      },
      QTY: {
        type: Number,
        required: true,
      },
      PRICE: {
        type: Schema.Types.Decimal128,
        required: true,
      },
    },
  ],
  TOTAL_AMOUNT: {
    type: Schema.Types.Decimal128,
    required: true,
  },

  DELIVERY_ADDRES: {
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  PAYMENT_MODE: {
    type: String,
  },
  TRANSACTION_REF_ID: {
    type: String,
  },
  STATUS: [
    {
      DATE_TIME: {
        type: Date,
      },
      CURRENT_STATUS: {
        type: String,
      },
      REMARK: {
        type: String,
      },
      IS_DELIVERED: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const ORDER_MODEL = mongoose.model("orders", ORDERS_SCHEMA);
