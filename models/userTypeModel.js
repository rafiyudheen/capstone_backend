
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER_TYPES_SCHEMA = new Schema({
  USER_TYPE: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  isSeller: {
    type: Boolean
  }
});

const USER_TYPES_MODEL=mongoose.model('user_types',USER_TYPES_SCHEMA)



module.exports=USER_TYPES_MODEL