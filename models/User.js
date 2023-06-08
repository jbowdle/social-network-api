const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    // needs validators
    username: {
      type: String,
      required: true,
    },
    // needs validators
    email: {
      type: String,
      required: true,
    },
    // missing thoughts and friends references
  },
);

const User = model("user", userSchema);

module.exports = User;