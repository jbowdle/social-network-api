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
      // email must pass this regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      validate: emailValidator,
    },
    // thoughts and friends only holds the _ids of the thoughts and friends. Extra querying is needed to
    // obtain their full documents
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

// stores the number of friends a user has
userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;