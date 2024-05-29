const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: {
  //   // type: mongoose.Schema.Types.ObjectId,
  //   // type: mongoose.ObjectId,
  //   type: String,
  // },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;