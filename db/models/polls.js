'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Poll = db.define('polls', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Poll;
