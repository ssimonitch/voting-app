require('./config/passport');
const passport = require('passport');

const Authentication = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: true });
const localAuth = passport.authenticate('local', { session: true });

module.exports = function(app) {
  app.get('/auth/test', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.get('/foo', function(req, res) {
    var sessData = req.session;
    sessData.someAttribute = 'foo';
    console.log('id:', req.session.id);
    console.log('cookie:', req.session.cookie);
    res.send('Returning with some text');
  });

  app.get('/bar', function(req, res) {
    var someAttribute = req.session.someAttribute;
    console.log('id:', req.session.id);
    console.log('cookie:', req.session.cookie);
    res.send(`This will print the attribute I set earlier: ${someAttribute}`);
  });

  app.post('/auth/signin', localAuth, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
};
