//Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const Appointment = require("./src/Model/Appointment");
const User = require("./src/Model/User");
const Company = require("./src/Model/Company");
const twilio = require('twilio');
const moment = require('moment');
const config = require('./src/Config/Production');
const axios = require('axios');

// Allow cross origin between client + server
app.use(cors());

//Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Serve static content
app.use(express.static("public"));

// MongoDB Configuration configuration (Change this URL to your own DB) - models toDo
mongoose.connect("mongodb://localhost/bookings", { useMongoClient: true });
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});




//API Routes - toDo

//POST new appointment + Twilio
app.post('/api/appointments', (req, res) => {
  //AK Twilio info
  const twilioSid = config.twilio.sid
  const twilioAuth = config.twilio.auth
  const twilioClient = twilio(twilioSid, twilioAuth)
  const twilioNumber = config.twilio.number
  const appointment = req.body
  appointment.phone = appointment.phone.replace(/\D/g, '')
  const date = moment(appointment.date, 'YYYY-DD-MM').startOf('day')
  const time = date.hour(9).add(appointment.slot, 'hours')
  const smsBody = `${appointment.name}, this message is to confirm your appointment at ${time.format('h:mm a')} on ${date.format('dddd MMMM Do[,] YYYY')}.`
  //send confirmation message to user
  twilioClient.messages.create({
    to: '+1' + appointment.phone,
    from: twilioNumber,
    body: smsBody
  }, (err, message) => console.log(message, err));
  //save new appointment to db
  const newAppt = new Appointment(req.body);
  newAppt.save(function (error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      User.findOneAndUpdate({}, { $push: { "appointments": doc._id } }, { new: true }, function (err, newdoc) {
        if (err) {
          res.send(err);
        }
        else {
          res.send(newdoc);
        }
      });
      Company.findOneAndUpdate({}, { $push: { "appointments": doc._id } }, { new: true }, function (err, newdoc) {
        if (err) {
          res.send(err);
        }
        else {
          res.send(newdoc);
        }
      });
    }
  });
});

//save new company
app.post('/api/companies', (req, res) => {
  const newBiz = new Company(req.body);
  newBiz.save(function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(doc);
    }
  });
});

//save new user
app.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newBiz.save(function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(doc);
    }
  });
});

//GET appointments for a company
app.get("/api/companies/:id", function (req, res) {
  Company.findOne({ "_id": req.params.id }).populate("appointments").exec(function (error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.send(doc);
    }
  });
});

app.get("/api/appointments", function (req, res) {
  Appointment.find({}).exec(function (error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.send(doc);
    }
  });
});


//send 'em home
app.get('/', (req, res) => {
  res.send('index.html')
});

// Main "*" Route. This will redirect the user to our rendered React application
app.get("*", (req, res) => {
  res.sendFile(__dirname + "public");
});


// Listener
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});