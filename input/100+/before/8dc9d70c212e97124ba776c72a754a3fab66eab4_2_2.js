function(rel, callback) {
    if (Array.isArray(rel)) {
      var updateRel = naan.ncurry(this.rel.update, properties, 2);
      return async.map(rel, updateRel, callback);
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