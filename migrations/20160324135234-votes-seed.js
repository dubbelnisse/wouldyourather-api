'use strict'

const data = require('./statements/votes.json')

exports.up = function (r, connection) {
  return r.table('votes').insert(data).run(connection)
}

exports.down = function (r, connection) {
  return r.table('votes').delete().run(connection)
}
