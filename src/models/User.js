import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
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



  export default mongoose.model('User', UserSchema);

