'use strict'

const data = require('./statements/active.json')

exports.up = function (r, connection) {
  return r.table('active').insert(data).run(connection)
}

exports.down = function (r, connection) {
  return r.table('active').delete().run(connection)
}
