const { Thought, User, } = require("../models");

// functions to be used by routes/api/thoughtRoutes
module.exports = {
  // get api/thoughts, returns all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get api/thoughts/:thoughtId
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // post api/thoughts
  // requires req.body with thoughtText, username, and userId
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // adds thought to users thought array
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
  // put api/thoughts/:thoughtId
  // can take reactionBody or username
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
  // delete api/thought/:thoughtId
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      // removes thought from the users thought array
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
  // post api/thoughts/:thoughtId/reactions
  // requires reactionBody and username
  async createReaction(req, res) {
    try {
      // creates reaction object
      const reaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      }

      // adds reaction object to thought's reaction array
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction }},
        { new: true },
      )
      
      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // delete api/thoughts/:thoughtId/reactions/:reactionId
  async deleteReaction(req, res) {
    try {
      // removes reaction from thought's reaction array
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId }}},
        { new: true }
      );
      
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