const uuid = require('uuid');

function create() {
  return uuid.v4().replace(/-/g, '');
}

module.exports = {
  create
};
