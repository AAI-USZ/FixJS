function(options, startNode, type, endNode, properties, callback) {
    if (typeof properties === 'function') {
      callback = properties;
      properties = null;
    }

    if (Array.isArray(startNode)) {
      var args = [ options, type, endNode, properties ];
      var createRel = naan.b.ecurry(this, this.rel.create, args, [0, 2, 3, 4]);
      return stuff.throttle(startNode, createRel, callback);
    } else if (Array.isArray(endNode)) {
      var args = [ options, startNode, type, properties ];
      var createRel = naan.b.ecurry(this, this.rel.create, args, [0, 1, 2, 4]);
      return stuff.throttle(endNode, createRel, callback);
    }
    
    var startNodeId = this._getId(options, startNode),
        endNodeId = this._getId(options, endNode);

    if (startNodeId == null || endNodeId == null) {
      return callback(new Error("Invalid ID"));
    }

    var request = {
      to: this._location(options, 'node', endNodeId),
      type: type,
    };

    if (properties) {
      request['data'] = properties;
    }

    var endpoint = util.format('node/%d/relationships', startNodeId);
    var op = this.operation(options, endpoint, 'POST', request);
    this.call(options, op, function(err, rel) {
      if (err) {
        callback(err);
      } else {
        callback(null, this._createRelationshipObject(options, rel));
      }
    });
  }