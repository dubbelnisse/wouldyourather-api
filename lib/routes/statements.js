var db = require('../db').r;

function all (req, res, next) {
  db.table('statements')
    .limit(50)
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(statements => {
      res.send(statements)
      return next()
    })
}

module.exports = {
  all: all
}
