const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  bio: String,
  age: Number,
  country: String,
  contentType: String
});

const Influencer = mongoose.model('Influencer', influencerSchema, 'influencer');
module.exports = {Influencer}