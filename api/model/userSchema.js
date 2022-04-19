const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username must be filled'],
      unique: [true,'username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'email must be filled!'],
      unique: true,
      minlength: [6, `must be atlest 6 but `],
    },
    password: {
      type: String,
      required: [true, 'password should be filled!'],
      minlength: [8, 'password must be 8 charecters long'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

