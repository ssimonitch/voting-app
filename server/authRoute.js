require('./config/passport');
const passport = require('passport');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/authtest', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
