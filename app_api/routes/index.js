const express = require("express");
const Business = require("../db/business");
const router = express.Router();

router.get('/business', async (req, res, next) => {
  try {
    const users = await Business.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;