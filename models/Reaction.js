const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/helpers");

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
      get: formatDate,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;