var db = require('../db').r;

function user (req, res, next) {
  res.send({ user: 'me' })
  return next()
}

module.exports = {
  user: user
}
