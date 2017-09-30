const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointment"
      }]
  });

  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;

