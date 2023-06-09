const { User, Thought } = require("../models");

module.exports = {
  // get api/users, returns all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get api/users/:userId
  async getSingleUser(req, res) {
    try {
      // finds matching user
      const user = await User.findOne({ _id: req.params.userId });

      // user only contains _id for thoughts and friends, extra queries are needed to get them to display
      // finds all associated thoughts using user variable
      const thoughts = await Thought.find({ username: user.username });

      const friends = [];
      // finds friends from user's friend array and pushes them to the above array
      for (let i = 0; i < user.friends.length; i++) {
        const friend = await User.findOne({ _id: user.friends[i] });
        friends.push(friend);
      }

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      // returns user data along with a populated thoughts list and populated friends list
      res.status(200).json({
        user: user,
        thoughts: thoughts,
        friends: friends,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // post api/users
  // requires username and valid email
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // put api/users/:userId
  // can take email or username
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // delete api/users/:userId
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      // deletes all thoughts that the user created
      await Thought.deleteMany({ username: user.username });
      // The user reactions are kept but their username is removed
      await Thought.updateMany(
        { "reactions.username": user.username },
        {
          $set: {
            // The '$' below is a positional operator. It refers to the index of the matched reaction found above
            "reactions.$.username": "[deleted]"
          }
        },
        { new: true },
      );
      // removes deleted user from other users' friend lists
      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId }},
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({ message: `User ${user.username} deleted`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // post api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      // adds friend to user friend list
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!user) {
        return res.status(404).json({ message: "UserId not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "FriendId not found" });
      }

      res.status(200).json({ message: `Friend added`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // delete api/users/:userId/friends/:friendId
  async deleteFriend(req, res) {
    try {
      // removes friend
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );
      const friend = await User.findOne({ _id: req.params.friendId });

      if (!user) {
        return res.status(404).json({ message: "UserId not found" });
      }
      if (!friend) {
        return res.status(404).json({ message: "FriendId not found" });
      }

      res.status(200).json({ message: `Friend deleted`});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}