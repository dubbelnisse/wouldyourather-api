var db = require('../db').r
var _ = require('lodash')

function all () {
  db.table('statements')
    .limit(50)
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(statements => {
      return _.filter(statements, {'used': false})
    })
    .then(notActive => {
      return notActive[Math.floor(Math.random() * notActive.length)];
    })
    .then(newStatement => {
      db.table('statements')
        .getAll(newStatement.id, { index: 'id'})
        .update({
          used: true,
          date: new Date()
        })
        .run(db.conn)
        .then(() => {
          db.table('active')
            .update({
              statement: newStatement.id
            })
            .run(db.conn)
            .then(() => console.log('Statement updated'))
        })
    })
}

module.exports = {
  changeStatement: all
}
