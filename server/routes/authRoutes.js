const passport = require('passport');

const authController = require('../controllers/auth');

module.exports = app => {
  app.post('/auth/login', passport.authenticate('local'), authController.login);
  app.get('/auth/logout', authController.logout);
  app.post('/auth/email_signup', authController.emailSignup);

  // TWITER AUTH
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/dashboard');
  });
};
