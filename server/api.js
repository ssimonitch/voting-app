const api = (module.exports = require('express').Router());

const users = require('./users');
const polls = require('./polls');
const options = require('./options');

api
  .get('/express-test', (req, res) => res.send({ express: 'working!' })) //demo route to prove api is working
  .use('/users', users)
  .use('/polls', polls)
  .use('/options', options);

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
