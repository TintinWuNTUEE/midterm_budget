const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    productName:String,
    price : Number
  },
  { timestamps: true }
);
module.exports = mongoose.model("ItemSchema", ItemSchema);