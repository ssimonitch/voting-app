'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const Vote = db.define(
  'votes',
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    poll_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    option_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'poll_id']
      }
    ]
  }
);

module.exports = Vote;
