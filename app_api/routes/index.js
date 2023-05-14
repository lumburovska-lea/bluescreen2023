const express = require("express");
const {Business} = require("../db/business");
const { Influencer } = require("../db/influencer");
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport')
const jwt = require("jsonwebtoken");
const jwtSecret = require('../jwtsecret');
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

router.post('/businesses/login',
    passport.authenticate('username-password', { failureRedirect: '/login', session: false }),
        (req, res) => {
  console.log(req.cookies)

          const jwtClaims = {
            sub: req.user.email,
            iss: 'localhost:3000',
            aud: 'localhost:3000',
            exp: Math.floor(Date.now() / 1000) + 604800, // 1 week (7×24×60×60=604800s) from now
            role: 'business', // just to show a private JWT field
            name: req.user.name,
            bio: req.user.bio
          }

          // generate a signed json web token. By default the signing algorithm is HS256 (HMAC-SHA256), i.e. we will 'sign' with a symmetric secret
          const token = jwt.sign(jwtClaims, jwtSecret)

          // From now, just send the JWT directly to the browser. Later, you should send the token inside a cookie.

          // We can also send the token inside a cookie, which is more secure, but it's not supported by all browsers.
          // Below we send the token inside a cookie named 'jwt' and we set the cookie to expire in 1 week.
          cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'None'
          }
          console.log(token)
          res.cookie('jwt', token, cookieOptions)
          res.send({name: jwtClaims.name, email: jwtClaims.sub, bio: jwtClaims.bio})

          // And let us log a link to the jwt.io debugger, for easy checking/verifying:
          // console.log(`Token sent. Debug at https://jwt.io/?value=${token}`)

        }
    )

router.post('/businesses/register', async (req, res) => {
  const { name, email, bio, password } = req.body;

  try {
    // Create a new business object
    const newBusiness = new Business({
      name,
      email,
      bio,
      password,
    });

    // Save the business to the database
    const savedBusiness = await newBusiness.save();

    res.status(201).json({ message: 'Business created successfully', business: savedBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create business' });
  }
});

router.get(
    '/businesses/current',
    passport.authenticate('jwtCookie', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      const userToken = jwt.decode(req.cookies.jwt)
      res.send({name: userToken.name, email: userToken.email, bio: userToken.bio})
    }
)


module.exports = router;
