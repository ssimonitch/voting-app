const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require('./authRoute');

const app = express();

// MIDDLEWARE
app.use(morgan('combined')); // logging
app.use(cors()); // open up API to CORS
app.use(bodyParser.urlencoded({ extended: true })); // parse url
app.use(bodyParser.json()); // parse body

// ROUTES
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api', require('./api'));
authRoute(app);

// ALWAYS RENDER MAIN FOR REACT-ROUTER
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// SERVE IT UP
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
