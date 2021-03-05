const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
