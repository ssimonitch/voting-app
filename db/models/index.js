'use strict';

const User = require('./users');
const Poll = require('./polls');
const Option = require('./options');

User.hasMany(Poll);
Poll.belongsTo(User);

Poll.hasMany(Option);
Option.belongsTo(Poll);

module.exports = { User, Poll, Option };
