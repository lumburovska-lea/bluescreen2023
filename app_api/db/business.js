const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bio: String
});

const Business = mongoose.model('Business', businessSchema, 'business');

module.exports = {Business}