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

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [{
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
    }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;