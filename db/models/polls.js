'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Poll = db.define('polls', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vote_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Poll;
