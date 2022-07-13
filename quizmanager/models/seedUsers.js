const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");
const userList = require("./userList.json");

let client;

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function seedUsers() {
  try {
    await mongoose.connect(
      "mongodb+srv://Jdibbert:11Jamie11@projectquizz.vizvj.mongodb.net/schwizz" // replace the connection string with your companies
    );
    client = mongoose.connection;
    const User = client.db.collection("users");

    // await User.deleteMany({}); // WIPES ALL USERS FROM DB
    for (let user of userList) {
      const currentUser = await User.findOne({ email: user.email });
      console.log("Found User:", currentUser);
      if (!currentUser) {
        user.password = await hashPassword(user.password);
        user = await User.insertOne(user);
        console.log(user);
      }
    }
  } catch (err) {
    console.log("ERROR:", err.message);
  }
}

seedUsers().finally(() => {
  if (client) client.close();
  process.exit(0);
});
