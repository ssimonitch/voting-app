const config = require('../config');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const db = require('../../db'); // eslint-disable-line
const uuid = require('../services/uuid');
const User = require('../../db/models/users');

/**
 * Email and Password
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      email = email.toLowerCase();

      const user = await User.findOne({ where: { email } });
      if (!user) return done(null, false);

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    }
  )
);

/**
 * Twitter oAuth
 */
passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    async (accessToken, tokenSecret, profile, done) => {
      const existingUser = await User.findOne({ where: { twitterId: profile.id.toString() } });

      if (existingUser) done(null, existingUser);

      const user = await User.create({
        email: profile.username + '@twitter.com',
        twitterId: profile.id,
        auth_token: uuid.create(),
        profile: {
          name: profile.displayName,
          location: profile._json.location
        }
      });

      if (!user) return console.log('Error creating user');

      console.log('USER SAVED', user);
      return done(null, user);
    }
  )
);

// serialize user
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
  User.findById(user.id).then(user => done(null, user));
});
