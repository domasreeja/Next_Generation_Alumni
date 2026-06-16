const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://your mongodb collrction URL";
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  console.log("MongoDB connected");
  return client.db("Alumni"); // ✅ EXACT database name
}

module.exports = connectDB;
