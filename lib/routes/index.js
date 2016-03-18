require('babel-core/register');

var statements = require('./statements')

function attach(server) {
  // Statements
  server.get('/statements' statements.all)
}

module.exports = {
  attach: attach
};
