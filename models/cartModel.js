const mongoose = require("mongoose");
const USER_MODEL = require("../models/userModel");
const PRODUCT_MODEL = require("./productModel");

const Schema = mongoose.Schema;
const CART_SCHEMA = new Schema({
  USER_ID: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
    required: true,
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
});

const CART_MODEL = mongoose.model("cart", CART_SCHEMA);

module.exports = CART_MODEL;
