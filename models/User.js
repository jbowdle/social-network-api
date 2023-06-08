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