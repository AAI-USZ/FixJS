function(type, indexName, callback) {
    if (Array.isArray(indexName)) {
      var delfn = naan.b.curry(this, indexModule.delete, type);
      return async.map(indexName, delfn, callback);
    }

    var endpoint = util.format('index/%s/%s', type, indexName);
    var op = this.operation(endpoint, 'DELETE');
    this.call(op, function(err) {
      callback(err);
    });
  }