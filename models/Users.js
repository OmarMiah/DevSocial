//Users.js

/*
    1. Mongoose request 
    2. We're making a request to create a new user 
    3. Name
    4. Email
    5. Avatar
    6. Date
*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // only one email address per
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema); // exporting the user schema
