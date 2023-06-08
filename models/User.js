const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    test: {
      type: String,
    },
  },
);

const User = model("user", userSchema);

module.exports = User;