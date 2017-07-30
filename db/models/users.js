'use strict';

const Sequelize = require('sequelize');
const Promise = require('bluebird'); // wrap all bcrypt methods in Promise
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const db = require('../index.js');

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vote_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// BEFORE CREATE: lowercase email and hash password
User.beforeCreate(user => {
  user.setDataValue('email', user.email.toLowerCase());

  return bcrypt
    .genSaltAsync(10)
    .then(salt => {
      return bcrypt.hashAsync(user.password, salt, null);
    })
    .then(hash => {
      user.setDataValue('password', hash);
    })
    .catch(err => {
      return Promise.reject(err);
    });
});

// METHOD: resolves true/false if password matches
User.prototype.comparePassword = function(candidate) {
  return new Promise(resolve => {
    bcrypt
      .compareAsync(candidate, this.password)
      .then(result => {
        resolve(result);
      })
      .catch(err => Promise.reject(err));
  });
};

module.exports = User;
