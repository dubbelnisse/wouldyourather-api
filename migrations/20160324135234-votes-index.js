exports.up = function (r, connection) {
  return Promise
    .all([
      r.table('votes').indexCreate('statement').run(connection)
    ])
    .then(() => {
      return r.table('votes').indexWait().run(connection)
    })
}

exports.down = function (r, connection) {
  return Promise
    .all([
      r.table('votes').indexDrop('statement').run(connection)
    ])
}
