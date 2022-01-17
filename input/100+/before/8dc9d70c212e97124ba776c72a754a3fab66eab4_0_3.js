function(type, indexName, obj, key, value, callback) {
    if (typeof key === 'function') {
      callback = key, key = null, value = null;
    } else if (typeof value === 'function') {
      callback = value, value = null;
    }
    
    if (Array.isArray(obj)) {
      var args = [type, indexName, key, value];
      var rm = naan.ecurry(this, indexModule.remove, args, [1, 2, 4, 5]);
      return async.map(obj, rm, callback);
    }

    var id = this._getId(obj);
    if (id == null) {
      return callback(new Error("Invalid ID"));
    }

    var endpoint = util.format('index/%s/%s', type, indexName);
  
    if (key) {
      endpoint += '/' + encodeURIComponent(key);
    } 
    if (value) {
      endpoint += '/' + encodeURIComponent(value);
    }

    endpoint += '/' + id;

    var op = this.operation(endpoint, 'DELETE');
    this.call(op, function(err) {
      callback(err);
    });
  }