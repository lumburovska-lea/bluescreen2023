const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');

const businessSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  password: String
});

businessSchema.methods.comparePassword = function(password, callback) {
  bCrypt.compare(this.password, password, function(err, result) {
    if(err)
      callback(err, false)
    else
      callback(null, result)
  });

}

const Business = mongoose.model('Business', businessSchema, 'businesses');

module.exports = {Business}
