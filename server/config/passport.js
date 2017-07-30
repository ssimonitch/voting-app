const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const db = require('../../db'); // eslint-disable-line
const config = require('./index');
const User = require('../../db/models/users');

// create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
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
  secretOrKey: config.secret
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

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
