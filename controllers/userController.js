const { User, } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}