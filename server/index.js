require('dotenv').config();

const config = require('./config');
const express = require('./express');

const app = express(config);

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${config.port}!`);
});
