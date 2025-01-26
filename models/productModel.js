const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CATEGORY_MODEL = require("./categoryModel");
const USER_MODEL = require("./userModel");

const PRODUCTS_SCHEMA = new Schema({
  PRODUCT_NAME: {
    type: String,
    required: true,
  },
  CATEGORY_ID: {
    type: Schema.Types.ObjectId,
    ref: CATEGORY_MODEL,
  },
  SELLING_PRICE: {
    type: Number,
    required: true,
  },
  DESCRIPTION: {
    type: String,
  },
  PHOTOS: [
    {
      type: String,
    },
  ],
  REVIEWS: {
    type: String,
  },
  APPROVED: {
    type: Boolean,
    default: false,
  },
  APPROVED_BY: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
  },
  ISACTIVE: {
    type: Boolean,
    default: true,
  },
});

const PRODUCT_MODEL = mongoose.model("Products", PRODUCTS_SCHEMA);

module.exports = PRODUCT_MODEL;
