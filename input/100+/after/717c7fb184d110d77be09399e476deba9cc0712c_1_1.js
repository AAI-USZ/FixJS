function(startNode, type, endNode, properties, callback) {
    if (typeof properties === 'function') {
      callback = properties;
      properties = null;
    }

    if (Array.isArray(startNode)) {
      var args = [ type, endNode, properties ];
      var createRel = naan.ecurry(this.rel.create, args, [1, 2, 3]);
      return async.map(startNode, createRel, callback);
    } else if (Array.isArray(endNode)) {
      var args = [ startNode, type, properties ];
      var createRel = naan.ecurry(this.rel.create, args, [0, 1, 3]);
      return async.map(endNode, createRel, callback);
    }
    
    var startNodeId = this._getId(startNode),
        endNodeId = this._getId(endNode);

    if (startNodeId == null || endNodeId == null) {
      return callback(new Error("Invalid ID"));
    }

    var request = {
      to: this._location('node', endNodeId),
      type: type,
    };

    if (properties) {
      request['data'] = properties;
    }

    var endpoint = util.format('node/%d/relationships', startNodeId);
    var op = this.operation(endpoint, 'POST', request);
    this.call(op, function(err, rel) {
      if (err) {
        callback(err);
      } else {
        callback(null, this._createRelationshipObject(rel));
      }
    });
  }