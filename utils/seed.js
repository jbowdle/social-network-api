const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.collection.insertMany([
    {
      username: "frodo",
      email: "hairyfeet@email.com",
    },
    {
      username: "samwise",
      email: "rabbitstew@email.com",
    },
    {
      username: "gandalf",
      email: "mithrandir@email.com",
    },
  ]);

  console.table(User);
  console.info("seeding complete");
  process.exit(0);
})