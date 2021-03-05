const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  cart: [
    {
      uid: String,
      image: String,
      price: Number,
      rating: Number,
      title: String,
    },
  ],
  amount: Number,
  created: Number,
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
