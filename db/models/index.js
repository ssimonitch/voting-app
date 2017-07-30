'use strict';

const User = require('./users');
const Poll = require('./polls');
const Option = require('./options');
const Vote = require('./votes');

User.hasMany(Poll);
Poll.belongsTo(User);

Poll.hasMany(Option);
Option.belongsTo(Poll);

User.hasMany(Vote);
Vote.belongsTo(Poll);
Vote.belongsTo(Option);

module.exports = { User, Poll, Option, Vote };
