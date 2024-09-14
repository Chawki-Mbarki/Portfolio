const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const { name, pw, dbName } = process.env;

const uri = `mongodb+srv://${name}:${pw}@cluster0.efhldmw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connection Established");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

connectDB();
