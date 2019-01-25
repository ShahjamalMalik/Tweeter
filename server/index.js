"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
let DataHelpers;
MongoClient.connect(MONGODB_URI, function (err, db) {
     if(err) throw err;
  app.use("/tweets", require("./routes/tweets")(require("./lib/data-helpers.js")(db)));
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});
});
