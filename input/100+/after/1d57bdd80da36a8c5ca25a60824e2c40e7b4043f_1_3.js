function(options, id, callback) {
    if (Array.isArray(id)) {
      var boundReadRelationship = naan.b.curry(this, this.rel.read, options);
      return stuff.throttle(id, boundReadRelationship, callback);
    }

    id = this._getId(options, id);

    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('relationship/%d', id);
    var op = this.operation(options, endpoint);
    this.call(options, op, function(err, rel) {
      if (err) {
        callback(err);
      } else {
        callback(null, this._createRelationshipObject(options, rel));
      }
    });
  }