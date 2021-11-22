const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  xp: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('user', userModel);

module.exports = User;