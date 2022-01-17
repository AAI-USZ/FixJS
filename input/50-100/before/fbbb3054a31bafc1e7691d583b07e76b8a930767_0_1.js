function (e, res) {
    if (e) return callback(e);

    doc._rev = res.rev;
    callback(null, doc);
  }