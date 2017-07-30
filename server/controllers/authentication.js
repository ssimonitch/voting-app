const jwt = require('jwt-simple');

const config = require('../config');
const db = require('../../db'); // eslint-disable-line
const User = require('../../db/models/users');

// generate web token
function generateUserToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// CASE: user account created. only need to provide token.
exports.signin = function(req, res) {
  res.send({ token: generateUserToken(req.user) });
};

exports.signup = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  // see if user with given email exists
  User.findOne({ where: { email } })
    .then(user => {
      if (user) return res.status(422).send({ error: 'Email in use' });
    })
    .catch(err => console.log(`Invalid email: ${err}`));

  User.create({ email, password })
    .then(user => {
      return res.json({ token: generateUserToken(user) });
    })
    .catch(err => {
      console.log(`Could not create user: ${err}`);
    });
};
