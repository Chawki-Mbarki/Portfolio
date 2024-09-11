const mongoose = require('mongoose');
require('dotenv').config();

const dbName = process.env.DB;
const port = process.env.PORT;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;

const uri = `mongodb+srv://${username}:${pw}@cluster0.efhldmw.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection Established On Port: ', port))
  .catch(err => console.log("Something went wrong when connecting to the database", err));
