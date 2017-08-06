const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const session = require('./session');
const router = require('./server-routes');

module.exports = function(options) {
  const app = express();

  app.use(cors());
  app.use(morgan('combined'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  session(app);
  router(app);

  // API
  app.use('/api', require('./api'));

  // VIEWS

  app.use(express.static(path.resolve(__dirname, '..', 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });

  app.set('port', options.port);

  return app;
};
