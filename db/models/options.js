'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Option = db.define('options', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  tally: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Option;
