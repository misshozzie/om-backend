// // for more robust and better error handling
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     if (!process.env.DATABASE_URL) {
//       throw new Error("DATABASE_URL is not defined");
//     }

//     mongoose.set("debug", true);

//     const conn = await mongoose.connect(process.env.DATABASE_URL);

//     console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;

const { ServerApiVersion } = require("mongodb");



// require("dotenv").config();

// const uri = process.env.DATABASE_URL || "your_fallback_mongodb_connection_string";

// const client = new MongoClient(uri, {
//   serverApi: ServerApiVersion.v1,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function connectDB() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     console.log("Connected to MongoDB");

//     // Initializing collections after a successful connection
//     const userCollection = client.db("officemate").collection("user");
//     const eventCollection = client.db("officemate").collection("events");
//     const notesCollection = client.db("officemate").collection("notes");



//     console.log("Collections initialized");

//     // Returning the collections for use elsewhere in the app
//     return { userCollection, eventCollection, notesCollection };
//   } catch (error) {
//     console.error("Could not connect to MongoDB", error);
//     process.exit(1); // Exit process with failure
//   }
// }

// module.exports = { client, connectDB };

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
