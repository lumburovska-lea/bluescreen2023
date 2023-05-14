const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');
const jwtSecret = require('crypto').randomBytes(16)

const businessSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  password: String
});

businessSchema.methods.comparePassword = function(password, callback) {
  var result = this.password === password
  callback(null, result)
}

const Business = mongoose.model('Business', businessSchema, 'businesses');

module.exports = {Business}
