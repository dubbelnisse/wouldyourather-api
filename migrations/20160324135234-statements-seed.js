'use strict'

const data = require('./statements/statements.json')

exports.up = function (r, connection) {
  return r.table('statements').insert(data).run(connection)
}

exports.down = function (r, connection) {
  return r.table('statements').delete().run(connection)
}
