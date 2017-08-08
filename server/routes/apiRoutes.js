const users = require('../controllers/users');
const polls = require('../controllers/polls');
const options = require('../controllers/options');

module.exports = app => {
  app.get('/api/express-test', (req, res) => res.send({ express: 'working!' }));
  app.use('/api/users', users);
  app.use('/api/polls', polls);
  app.use('/api/options', options);

  app.get('/api/current_user', (req, res) => {
    if (!req.user) return res.status(404).send({ error: 'user not logged in' });
    return res.send(req.user);
  });

  app.use((req, res) => res.status(404).end());
};
