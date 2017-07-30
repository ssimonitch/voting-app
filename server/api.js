const api = (module.exports = require('express').Router());

const users = require('./controllers/users');
const polls = require('./controllers/polls');
const options = require('./controllers/options');

api
  .get('/express-test', (req, res) => res.send({ express: 'working!' }))
  .use('/users', users)
  .use('/polls', polls)
  .use('/options', options);

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
