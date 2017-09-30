const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
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


  const Company = mongoose.model('Company', CompanySchema);
  
  module.exports = Company;