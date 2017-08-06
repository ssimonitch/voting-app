'use strict';

const PORT = process.env.PORT || 8000;

module.exports = {
  port: PORT,

  sessionSecret: process.env.SESSION_SECRET || 'djsfiosodjf093f3pjasdagfaedffasf',

  redis: {
    host: 'localhost',
    port: 6379,
    ttl: 2592000
  },

  postgres: {} // need to config

  // twitter: {
  //   consumerKey: process.env.TWITTER_KEY || 'sRS0PTMaOPdnGPUKXJFZZoDfe',
  //   consumerSecret: process.env.TWITTER_SECRET || 'CzppCE6Xc8ZQRKjLbkRcVGuhYkLH3zfJMxZuT64G6CtkDDYLnl',
  //   callbackURL: '/auth/twitter/callback',
  //   passReqToCallback: true,
  //   enableProof: true,
  //   authOptions: {}
  // }
};

//constructing Postgres connection string
if (process.env.NODE_ENV === 'development') {
  module.exports.postgres = 'postgres://localhost:5432/voting_app_dev';
} else if (process.env.NODE_ENV === 'test') {
  module.exports.postgres = 'postgres://localhost:5432/voting_app_dev';
} else {
  module.exports.postgres = process.env.DATABASE_URL || 'postgres://localhost:5432/voting_app_prod';
}
