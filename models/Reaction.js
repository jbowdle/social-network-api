const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;