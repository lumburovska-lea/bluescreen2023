const express = require("express");
const Business = require("../db/business");
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

module.exports = router;