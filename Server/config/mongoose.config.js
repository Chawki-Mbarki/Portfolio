const mongoose = require("mongoose");
require("dotenv").config();

const { username, pw, dbName } = process.env;

const uri = `mongodb+srv://${username}:${pw}@cluster0.efhldmw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("Connection Established"))
  .catch((err) => console.error("Database connection failed", err));
