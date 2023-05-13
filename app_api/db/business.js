const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String
});

const Business = mongoose.model('Business', businessSchema, 'businesses');

module.exports = {Business}