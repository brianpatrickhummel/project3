//Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

// Allow cross origin between client + server
app.use(cors());

//Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// MongoDB Configuration configuration (Change this URL to your own DB) - models toDo
mongoose.connect("mongodb://localhost/bookings", { useMongoClient: true });
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});

db.once("open",() => {
  console.log("Mongoose connection successful.");
});


//API Routes - toDo


// Main "*" Route. This will redirect the user to our rendered React application
app.get("*", (req, res) => {
    res.sendFile(__dirname + "public");
  });


// Listener
app.listen(PORT, () =>  {
  console.log("App listening on PORT: " + PORT);
});