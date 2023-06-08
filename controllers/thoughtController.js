const { Thought, User, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id }},
        { runValidators: true, new: true},
      );
      
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // todo:
  // put and delete by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId }},
        { new: true }
      )

      res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete(req.params.reactionId);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );
      
      if (!reaction) {
        return res.status(404).json({ message: "No reaction found" });
      }
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json({ message: "Reaction deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}