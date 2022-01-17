function (id, doc, callback) {
  delete doc.id;
  return this.request('put', id, doc, function (e, res) {
    if (e) {
      if (e.headers) {
        e.status = e.headers.status;
      }
      return callback(e);
    }

    doc._rev = res.rev;
    doc.id = id;
    callback(null, doc);
  });
}