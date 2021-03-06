var db = require('../db').r
var _ = require('lodash')
var moment = require('moment')

function all (req, res, next) {
  db.table('statements')
    .limit(50)
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(statements => {
      return _.filter(statements, {'used': true})
    })
    .then(statements => {
      return _.reverse(_.sortBy(statements, 'date', function(statement) {
        return moment(statement.date).format('X')
      }))
    })
    .then(statements => {
      res.send(statements)
      return next()
    })
}

function today (req, res, next) {
  db.table('active')
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(current => current[0].statement)
    .then(id => {
      db.table('statements')
        .get(id)
        .run(db.conn)
        .then(current => {
          db.table('votes')
            .getAll(current.id, { index: 'statement' })
            .run(db.conn)
            .then(cursor => cursor.toArray())
            .then(votes => {
              console.log(votes)
              var result = {
                optionOne: 0,
                optionTwo: 0,
                total: 0
              }

              if (votes.length > 0) {
                result = {
                  optionOne: votes[0].optionOne,
                  optionTwo: votes[0].optionTwo,
                  total: votes[0].optionOne + votes[0].optionTwo
                }
              }

              res.send({
                id: current.id,
                optionOne: current.optionOne,
                optionTwo: current.optionTwo,
                statement: current.statement,
                result: result
              })
              return next()
            })
        })
    })
}

function vote (req, res, next) {
  const id = req.params.id
  const option = req.params.option

  var voteOption = 'optionOne'
  var defaultOption = 'optionTwo'

  if (option === '2') {
    voteOption = 'optionTwo'
    defaultOption = 'optionOne'
  }

  db.table('votes')
    .getAll(id, { index: 'statement' })
    .run(db.conn)
    .then(cursor => cursor.toArray())
    .then(exists => {
      if(!exists.length) {
        db.table('votes')
          .insert({
            statement: id,
            [voteOption]: 1,
            [defaultOption]: 0
          })
          .run(db.conn)
          .then(insert => {
            res.send(insert)
            return next()
          })
      } else {
        db.table('votes')
          .getAll(id, { index: 'statement' })
          .update({
            [voteOption]: db
              .row(voteOption)
              .add(1)
          })
          .run(db.conn)

        res.send(exists)
        return next()
      }
    })
    .catch(err => res.send(err))
}

module.exports = {
  all: all,
  today: today,
  vote: vote
}
