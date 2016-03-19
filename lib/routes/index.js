require('babel-core/register');

var statement = require('./statement')

function attach(server) {
  // Statement
  server.get('/statement/all', statement.all)
  server.get('/statement/today', statement.today)
  server.post('/statement/:id/:option', statement.vote)
}

module.exports = {
  attach: attach
};
