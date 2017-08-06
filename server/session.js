const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

const config = require('./config');

module.exports = function(app) {
  require('passport');

  app.use(cookieParser(config.sessionSecret));
  app.use(
    session({
      secret: config.sessionSecret,
      store: new RedisStore(config.redis),
      resave: true,
      saveUninitialized: true,
      proxy: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
