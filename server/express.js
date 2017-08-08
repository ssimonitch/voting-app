const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const session = require('./session');

module.exports = options => {
  const app = express();

  // create middlewares
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // init session & passport
  session(app);

  // init strategies and routes
  require('./services/passport');
  require('./routes/authRoutes')(app);
  require('./routes/apiRoutes')(app);

  // create default views
  app.use(express.static(path.resolve(__dirname.toLowerCase(), '..', 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname.toLowerCase(), '..', 'public', 'index.html'));
  });

  // set port
  app.set('port', options.port);

  return app;
};
