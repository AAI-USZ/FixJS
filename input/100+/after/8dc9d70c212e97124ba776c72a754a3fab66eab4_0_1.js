function(type, name, config, callback) {
    if (typeof name === 'function') {
      callback = name;
      name = type;
      type = 'node';
      config = null;
    } else if (typeof config === 'function') {
      callback = config;
      if (typeof name === 'object' && !Array.isArray(name)) {
        config = name;
        name = type;
        type = 'node';
      } else {
        config = null;
      }
    } 

    if (Array.isArray(name)) {
      var args = [ type, config ];
      var indexer = naan.ecurry(indexModule.create, args, [1, 3]);
      return async.map(name, indexer, callback);
    }

    if (!isValidType(type, callback)) {
      return;
    }

    var request = { name: name };
    if (config != null) {
      request.config = config;
    }

    var endpoint = util.format('index/%s', type);
    var op = this.operation(endpoint, 'POST', request);
    this.call(op, function(err) {
      callback(err);
    });
  }