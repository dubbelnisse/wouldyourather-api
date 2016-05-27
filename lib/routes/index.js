require('babel-core/register');

var statement = require('./statement')
var user = require('./user')
var login = require('./login')
var passport = require('passport')

function attach(app) {
  // Statement
  app.get('/statements', statement.all)
  app.get('/today', statement.today)
  app.post('/vote', statement.vote)

  // User
  app.get('/users', user.user)

  // Login
  app.get('/login', passport.authenticate('facebook'));
  app.get(
    '/login/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.send(req)
    }
  );
}

module.exports = {
  attach: attach
};
