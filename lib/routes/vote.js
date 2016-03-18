var db = require('../db').r;

function vote (req, res, next) {
  res.send('vote - ' + req.params.id + ' - ' + req.params.option)
}

module.exports = {
  vote: vote
}
