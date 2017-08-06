'use strict';

const Sequelize = require('sequelize');
const Promise = require('bluebird'); // wrap all bcrypt methods in Promise
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const db = require('../index.js');

const User = db.define(
  'users',
  {
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
    twitterId: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    profile: Sequelize.JSON,
    auth_token: Sequelize.JSON,
    vote_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    indexes: [
      {
        name: 'twitterIdIndex',
        fields: ['twitterId']
      }
    ]
  }
);

// HOOKS
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

// CLASS METHODS
User.findUser = function(email, password, cb) {
  User.findOne({
    where: { email: email }
  })
    .then(user => {
      if (user === null || user.password === null || user.password.length === 0) {
        return cb('User / Password combination is not correct', null);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) cb(null, user);
        else cb(err, null);
      });
    })
    .catch(err => cb(err, null));
};

// INSTANCE METHODS
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
