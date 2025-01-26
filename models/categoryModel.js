const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CATEGORY_SCHEMA = new Schema({
  CATEGORY_NAME: {
    type: String,
  },
});

const CATEGORY_MODEL = mongoose.model("category", CATEGORY_SCHEMA);

module.exports = CATEGORY_MODEL;
