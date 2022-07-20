const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    item_name: {
      type: String,
      require: true,
    },
    cost: {
      type: String,
      require: true,
    },
    order_date: {
      type: String,
      require: true,
    },
    delivery_date: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "order",
    versionKey: false,
  }
);

module.exports = mongoose.model("order", orderSchema);