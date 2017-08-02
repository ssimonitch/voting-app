require('./config/passport');
const passport = require('passport');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const localAuth = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // authentication test route
  app.get('/auth/test', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });

  // provide jwt token for existing user
  app.post('/auth/signin', localAuth, Authentication.signin);

  // create user record and provide jwt token
  app.post('/auth/signup', Authentication.signup);
};
