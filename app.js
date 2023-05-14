const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Influencer = require('./app_api/db/influencer.js')
const Business = require('./app_api/db/business.js')
const passport = require('passport')
const logger = require('morgan')
const cookies = require("cookie-parser");
require('./app_api/db/db.js')
require('./app_api/passport')

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Allow the Angular app's domain
  credentials: true // Allow credentials (cookies)
}));
app.use(passport.initialize())
app.use(logger('dev'))
app.use(cookies());

var indexApi = require('./app_api/routes/index.js');

app.use('/api', indexApi)

app.get('/businesses', async (req, res) => {
  try {
    const businesses = await Business.Business.find({});
    console.log(businesses);
    res.json(businesses);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/influencers', async (req, res) => {
  try {
    const influencers = await Influencer.Influencer.find({});
    console.log(influencers);
    res.json(influencers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/influencers/:id', async (req, res, next) => {
  try {
    const influencer = await Influencer.Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    console.log(influencer);
    res.json(influencer);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
