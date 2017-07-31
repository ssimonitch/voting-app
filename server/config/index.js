module.exports = {
  secret: 'djsfiosodjf093f3pjasdagfaedffasf',

  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'sRS0PTMaOPdnGPUKXJFZZoDfe',
    consumerSecret: process.env.TWITTER_SECRET || 'CzppCE6Xc8ZQRKjLbkRcVGuhYkLH3zfJMxZuT64G6CtkDDYLnl',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true,
    enableProof: true,
    authOptions: {}
  }
};
