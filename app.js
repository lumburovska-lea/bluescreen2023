const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Influencer = require('./db/influencer.js')
const Business = require('./db/business.js')
require('./db/db.js')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/business', async (req, res) => {
  try {
    const users = await Business.Business.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});