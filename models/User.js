const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // needs validator
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    thoughts: [],
    friends: [],
  },
  // needs friendCount virtual
);

const User = model("user", userSchema);

module.exports = User;