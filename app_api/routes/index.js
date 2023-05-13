const express = require("express");
const Business = require("../db/business");
const { Influencer } = require("../db/influencer");
const router = express.Router();

router.get('/businesses', async (req, res, next) => {
  try {
    const businesses = await Business.find({});
    console.log(businesses);
    res.json(businesses);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/influencers', async (req, res, next) => {
  try {
    const influencers = await Influencer.find({});
    console.log(influencers);
    res.json(influencers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;