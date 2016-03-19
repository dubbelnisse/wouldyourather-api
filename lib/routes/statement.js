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

function vote (req, res, next) {
  const id = req.params.id
  const option = req.params.option

  db.table('votes')
    .getAll(id, { index: 'statementid' })
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(exists => {
      if(!exists.length) {
        res.send('not exists')
      } else {
        db.table('votes')
          .getAll(id, { index: 'statementid' })
          .update({
            [option]: db
              .row(option)
              .add(1)
          })
          .run(db.conn)

        res.send(exists)
      }
    })
    .catch(err => res.send(err))
}

module.exports = {
  all: all,
  today: today,
  vote: vote
}
