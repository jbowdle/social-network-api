const connection = require("../config/connection");
const { User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await User.collection.insertMany([
    {
      username: "test",
      email: "testemail@email.com",
    },
    {
      username: "test2",
      email: "test2email@email.com",
    },
    {
      username: "test3",
      email: "test3email@email.com",
    },
  ]);

  console.table(User);
  console.info("seeding complete");
  process.exit(0);
})