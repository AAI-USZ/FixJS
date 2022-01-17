function(type, indexName, obj, key, value, callback) {
    if (typeof value === 'function') {
      callback = value;
      value = key;
      key = obj;
      obj = indexName;
      indexName = type;
      type = 'node';
    }
    
    if (Array.isArray(obj)) {
      var args = [type, indexName, key, value];
      var indexer = naan.ecurry(indexModule.add, args, [1, 2, 4, 5]);
      return async.map(obj, indexer, callback);
    }

    if (!isValidType(type, callback)) {
      return;
    }

    var id = this._getId(obj);
    if (id == null) {
      return callback(new Error("Invalid ID"));
    }
    var location = this._location(type, id);

    var request = {
      uri: location,
      key: key,
      value: value
    };

    var endpoint = util.format('index/%s/%s', type, indexName);
    var op = this.operation(endpoint, 'POST', request);
    this.call(op, function(err) {
      callback(err);
    });
  }