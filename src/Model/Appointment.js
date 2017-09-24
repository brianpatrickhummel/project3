const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    notes: {
        type: String,
        required: false,
    }
  });

  const Appointment = mongoose.model('Appointment', AppointmentSchema);
  
  module.exports = Appointment;

