const { Schema, model } = require("mongoose");
const { emailValidator } = require("../utils/helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: emailValidator,
    },
    thoughts: [],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;