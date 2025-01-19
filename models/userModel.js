const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_TYPES_MODEL = require("./userTypeModel");

const USERS = new Schema({
  USER_NAME: {
    type: String,
    required: true,
    unique: true,
  },
  FULL_NAME: {
    type: String,
    required: true,
  },
  MOBILE_NO: {
    type: String,
    required: true,
    unique: true,
  },
  E_MAIL: {
    type: String,
    required: true,
    unique: true,
  },
  PASSWORD: {
    type: String,
    required: true,
  },
  DELIVERY_ADDRESSES: [
    {
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
  ],
  USER_TYPE: {
    type: Schema.Types.ObjectId,
    ref: USER_TYPES_MODEL,
  },
  IS_ACTIVE: {
    type: Boolean,
    default: true,
  },
  PROF_PIC: {
    type: String,
  },
});

const USER_MODEL = mongoose.model("users", USERS);

module.exports = USER_MODEL;
