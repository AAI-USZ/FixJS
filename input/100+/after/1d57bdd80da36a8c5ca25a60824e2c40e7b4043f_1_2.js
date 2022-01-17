function(options, rel, callback) {
    if (Array.isArray(rel)) {
      var args = [ options, properties ];
      var updateRel = naan.b.ecurry(this.rel.update, args, [0, 2]);
      return stuff.throttle(rel, updateRel, callback);
    }

    var id = this._getId(options, rel);

    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('relationship/%d/properties', id);
    var op = this.operation(options, endpoint, 'PUT', rel.properties);
    this.call(options, op, function(err) {
      callback(err);
    });
  }