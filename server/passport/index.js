'use strict';

const config = require('../config');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
// const TwitterStrategy = require('passport-twitter').Strategy;

const db = require('../../db'); // eslint-disable-line
const User = require('../../db/models/users');

/**
 * Sign in using Email and Password.
 */
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  email = email.toLowerCase();
  // verify username and password, call done with the user
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) return done(null, false);

      user.comparePassword(password).then(isMatch => {
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    })
    .catch(err => done(err));
});

// create JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.sessionSecret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // see if the user ID in the payload exists in our db
  User.findById(payload.sub)
    .then(user => {
      // if exists, call done with that user
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err));
});

// /**
//  * Twitter oAuth
//  */
// const twitterOptions = {
//   consumerKey: config.twitter.consumerKey,
//   consumerSecret: config.twitter.consumerSecret,
//   callbackURL: config.twitter.callbackURL
// };
//
// const twitterLogin = new TwitterStrategy(twitterOptions, (accessToken, tokenSecret, profile, done) => {
//   console.log('ping');
//   User.findOne({ where: { twitterId: profile.id.toString() } })
//     .then(existingUser => {
//       console.log('EXISTING USER', existingUser);
//       if (existingUser) done(null, existingUser);
//
//       const user = User.build({ twitterId: profile.id.toString() });
//       user.email = profile.username + '@twitter.com';
//       user.auth_token = { twitter: accessToken, twitterSecret: tokenSecret };
//       user.profile = {
//         name: profile.displayName,
//         location: profile._json.location
//       };
//       console.log('NEW USER', user);
//       user.save();
//       done(null, user);
//     })
//     .catch(err => done(err));
// });

// serialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  if (!user) return done(null, false);
  done(null, user);
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
// passport.use(twitterLogin);
