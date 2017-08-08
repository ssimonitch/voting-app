const db = require('../../db'); // eslint-disable-line
const uuid = require('../services/uuid');
const User = require('../../db/models/users');

exports.login = async (req, res) => {
  res.status(200).send({ token: req.user.auth_token });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.emailSignup = async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  // see if user with given email exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(422).send({ error: 'Email in use' });

  // create new user if none found
  const user = await User.create({
    email,
    password,
    auth_token: uuid.create()
  });

  if (!user) return console.log('Error creating user');
  return res.status(200).send({ message: 'User created successfully!' });
};
