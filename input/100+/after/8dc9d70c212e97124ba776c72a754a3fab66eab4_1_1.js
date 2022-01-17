function(obj, direction, relName, callback) {
    if (typeof direction === 'function') {
      callback = direction;
      direction = 'all';
      relName = '';
    } else {
      if (typeof relName === 'function') {
        callback = relName;
        relName = '';
      }

      if (typeof direction !== 'string') {
        return callback(new Error('Invalid direction - ' + direction));
      } else if (typeof relName !== 'string') {
        return callback(new Error('Invalid relationship name - ' + relName));
      }

      direction = direction.toLowerCase();
      if (['in', 'all', 'out'].indexOf(direction) === -1) {
        return callback(new Error('Invalid direction - ' + direction));
      }
    }

    if (Array.isArray(obj)) {
      var args = [ direction, relName ];
      var rels = naan.ecurry(this.node.relationships, args, [1, 2]);
      return async.map(obj, rels, callback);
    }

    obj = this._getId(obj);

    if (obj == null) {
      callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('node/%d/relationships/%s', obj, direction);
    if (relName) {
      endpoint += "/" + relName;
    }
    var op = this.operation(endpoint);
    var self = this;
    this.call(op, function(err, rels) {
      if (err) {
        callback(err);
      } else {
        rels = rels.map(function(rel) {
          return self._createRelationshipObject(rel);
        });
        callback(null, rels);
      }
    });
  }