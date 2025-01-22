const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const USER_MODEL = require("./userModel");


const SELLER = new Schema({
  BUSSINES_NAME: {
    type: String,
    required: true
  },
  GST_NO: {
    type: String
  },
  ADDRESS: {
    type: String,
    required: true
  },
  CUSTOMERCARE: {
    type: String,
    // required: true
    
  },
  WEBSITE: {
    type: String,
    // required: true
    
  },
  IS_APPROVED: {
    type: Boolean,
    default: false,
  },
  
  APPROVED_BY: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
  },
  USER_ID: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
  }
});

const SELLER_MODEL = mongoose.model("seller", SELLER);

module.exports = SELLER_MODEL;
