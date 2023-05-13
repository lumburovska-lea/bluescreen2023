const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Influencer = require('./app_api/db/influencer.js')
const Business = require('./app_api/db/business.js')
require('./app_api/db/db.js')

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});