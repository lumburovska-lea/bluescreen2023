const express = require("express");
const {Business} = require("../db/business");
const { Influencer } = require("../db/influencer");
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport')
const jwt = require("jsonwebtoken");
router.use(bodyParser.json());

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

// Get business by id
router.get('/businesses/:id', async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    console.log(business);
    res.json(business);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get influencer by id
router.get('/influencers/:id', async (req, res, next) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    console.log(influencer);
    res.json(influencer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete business by id
router.delete('/businesses/:id', async (req, res, next) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    console.log('Deleted business:', business);
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete influencer by id
router.delete('/influencers/:id', async (req, res, next) => {
  try {
    const influencer = await Influencer.findByIdAndDelete(req.params.id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    console.log('Deleted influencer:', influencer);
    res.json({ message: 'Influencer deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/businesses/login', (req, res, next) => {
  passport.authenticate('username-password', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'An internal server error occurred' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const jwtClaims = {
      sub: user.email,
      iss: 'localhost:3000',
      aud: 'localhost:3000',
      exp: Math.floor(Date.now() / 1000) + 604800, // 1 week (7×24×60×60=604800s) from now
      role: 'user', // just to show a private JWT field
    };

    const token = jwt.sign(jwtClaims, jwtSecret);
    cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: true,
    };
    res.cookie('jwt', token, cookieOptions);
    res.json({ message: 'Login successful' });
  })(req, res, next);
});

module.exports = router;
