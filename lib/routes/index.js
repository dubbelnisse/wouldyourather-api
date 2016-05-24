require('babel-core/register');

var statement = require('./statement')
var user = require('./user')

function attach(app) {
  // Statement
  app.get('/statement/all', statement.all)
  app.get('/statement/today', statement.today)
  app.post('/vote', statement.vote)

  // User
  app.get('/users/:id', user.user)
}

module.exports = {
  attach: attach
};
