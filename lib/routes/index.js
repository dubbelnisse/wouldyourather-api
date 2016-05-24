require('babel-core/register');

var statement = require('./statement')

function attach(app) {
  // Statement
  app.get('/statement/all', statement.all)
  app.get('/statement/today', statement.today)
  app.post('/vote', statement.vote)
}

module.exports = {
  attach: attach
};
