const { ServerApiVersion } = require("mongodb");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DATABASE_URL || "your_fallback_mongodb_connection_string";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Optionally, initialize collections here if needed for setup/validation
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

// Function to access a collection
function getCollection(collectionName) {
  return client.db("officemate").collection(collectionName);
}

module.exports = { connectDB, getCollection };
