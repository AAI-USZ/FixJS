function(options, id, callback) {
    if (Array.isArray(id)) {
      var fn = naan.b.curry(this, this.read, options);
      return stuff.throttle(id, fn, callback);
    }

    id = this._getId(options, id);
    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('node/%d/properties', id);
    var op = this.operation(options, endpoint);
    this.call(options, op, function(err, body) {
      if (err) {
        return callback(err);
      } else {
        body[options.id] = id;
        return callback(null, body);
      }
    });
  }