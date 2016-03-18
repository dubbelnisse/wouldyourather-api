require('babel-core/register');

var statements = require('./statements')
var today = require('./today')
var vote = require('./vote')

function attach(server) {
  // Statements
  server.get('/statements', statements.all)

  // Today
  server.get('/today', today.today)

  // Vote
  server.get('/vote/:id/:option', vote.vote)
}

module.exports = {
  attach: attach
};
