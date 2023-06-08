const connection = require("../config/connection");
const { User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await User.collection.insertOne({
    test: "test",
  });

  console.table(User);
  console.info("seeding complete");
  process.exit(0);
})