exports.up = function (r, connection) {
  return Promise.all([
    r.tableCreate('active').run(connection),
    r.tableCreate('statements').run(connection),
    r.tableCreate('votes').run(connection)
  ]);
};

exports.down = function (r, connection) {
  return Promise.all([
    r.tableDrop('active').run(connection),
    r.tableDrop('statements').run(connection),
    r.tableDrop('votes').run(connection)
  ]);
};
