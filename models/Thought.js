const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/helpers");

// thoughts are a user's created text posts
const thoughtSchema = new Schema(
  {
    // thoughText stores the body of the thought and must contain between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    // the thought has an attached created at date
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    // other users can react to the thought. Reactions are stored in the following array:
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

// holds a count of all the reactions a post gets
thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;