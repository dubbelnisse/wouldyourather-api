var db = require('../db').r;

function today (req, res, next) {
  db.table('active')
    .limit(50)
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(current => current[0].statement)
    .then(id => {
      db.table('statements')
        .get(id)
        .run(db.conn)
        .then(current => {
          res.send(current)
          return next()
        })
    })

}

module.exports = {
  today: today
}
