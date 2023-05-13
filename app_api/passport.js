const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const cookies = require("cookie-parser");
const jwtSecret = require('crypto').randomBytes(16)
const {Business} = require("./db/business");

passport.use('username-password', new LocalStrategy(
    {
        usernameField: 'email',  // it MUST match the name of the input field for the username in the login HTML formulary
        passwordField: 'password',  // it MUST match the name of the input field for the password in the login HTML formulary
        session: false // we will store a JWT in the cookie with all the required session data. Our server does not need to keep a session, it's going to be stateless
    },
    function (email, password, done) {
        console.log(`Authentication attempt for username: ${email}, password: ${password}`)
        Business.findOne({email: email}).then((user) => {
            if (user) {
                console.log(user)
                user.comparePassword(password, (error, match) => {
                    if (error) {
                        console.log(error)
                        return done(error, false)
                    }
                    if (match) {
                        console.log('here2')
                        return done(null, user)

                    }
                    return done(null, false)
                })
            } else {
                return done(null, false)
            }
        }).catch((error) => {
            return done(error, false)
        })
    }
))
