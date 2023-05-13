const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Infleuncer = mongoose.model('Influencer', userSchema, 'influencer');
module.exports = {Influencer}