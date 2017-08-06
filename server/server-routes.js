require('./passport');

const passport = require('passport');
const config = require('./config');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: true });
const localAuth = passport.authenticate('local', { session: true });
// const twitterAuth = passport.authenticate('twitter', config.twitter.authOptions);

module.exports = function(app) {
  app.get('/auth/test', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/auth/signin', localAuth, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);

  //   // TWITER AUTH
  //   app.get('/auth/twitter', passport.authenticate('twitter'));
  //   app.get('/auth/twitter/callback', twitterAuth);
  // };

  // function onAuthSuccess(req, res) {
  //   const returnTo = req.session.returnTo || '/';
  //   delete req.session.returnTo;
  //   res.redirect(returnTo);
};
