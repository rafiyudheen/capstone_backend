const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_TYPES_MODEL=require("./userTypeModel")

const USERS = new Schema({
  USER_NAME: {
    type: String
  },
  FULL_NAME: {
    type: String
  },
  MOBILE_NO: {
    type: String
  },
  E_MAIL: {
    type: String
  },
  PASSWORD: {
    type: String
  },
  DELIVERY_ADDRESSES: [{
    address: {
      type: String
    },
    pincode: {
      type: String
    },
    contactNo: {
      type: String
    }
  }],
  USER_TYPE: {
    type: Schema.Types.ObjectId,
    ref: USER_TYPES_MODEL
  }
});

const USER_MODEL=mongoose.model("users",USERS)

module.exports=USER_MODEL