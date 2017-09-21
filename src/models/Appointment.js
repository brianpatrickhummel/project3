import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
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


  export default mongoose.model('Appointment', AppointmentSchema);