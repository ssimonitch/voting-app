const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../package.json');

const name = process.env.DATABASE_NAME || pkg.name;

const uri = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`;

console.log(chalk.yellow(`Opening database connection to ${uri}${name}`));

// create the database instance
const db = (module.exports = new Sequelize(uri, {
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true, // use snake_case rather than camelCase column names
    freezeTableName: true, // don't change table names from the one specified
    timestamps: true // automatically include timestamp columns
  }
}));

// authenticate
db
  .authenticate()
  .then(() => {
    console.log(
      `Connection to ${name} database has been established successfully.`
    );
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// pull in our models
require('./models');

// sync the db, creating it if necessary
function sync() {
  return db
    .sync({ force: false })
    .then(() => console.log(`Synced models to db ${uri}`))
    .catch(fail => {
      console.log(fail);
    });
}

db.didSync = sync();
