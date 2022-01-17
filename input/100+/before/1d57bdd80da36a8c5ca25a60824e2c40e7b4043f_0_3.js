function(options, id, callback) {
    if (Array.isArray(id)) {
      var del = naan.b.curry(this, this.node.delete, options);
      return async.map(id, del, callback);
    }

    id = this._getId(options, id);
    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('node/%d', id);
    var op = this.operation(options, endpoint, 'DELETE');
    this.call(options, op, function(err) {
      callback(err);
    });
  }