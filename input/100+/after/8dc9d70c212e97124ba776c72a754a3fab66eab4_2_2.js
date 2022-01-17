function(rel, callback) {
    if (Array.isArray(rel)) {
      return async.map(rel, this.rel.update, callback);
    }

    var id = this._getId(rel);

    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('relationship/%d/properties', id);
    var op = this.operation(endpoint, 'PUT', rel.properties);
    this.call(op, function(err) {
      callback(err);
    });
  }