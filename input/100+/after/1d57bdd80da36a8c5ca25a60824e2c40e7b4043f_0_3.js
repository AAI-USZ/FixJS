function(options, id, callback) {
    if (Array.isArray(id)) {
      var fn = naan.b.curry(this, this.node.delete, options);
      return stuff.throttle(id, fn, callback);
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