function (uris, database, options, callback) {
  var uris = uris.split(',')
    , self = this;

  switch (arguments.length) {
    case 3:
      this.name = database;
      if ('function' === typeof options) callback = options, options = {};
      break;
    case 2:
      switch (typeof database) {
        case 'string':
          this.name = database;
        case 'function':
          callback = database, database = null;
          break;
        case 'object':
          options = database, database = null;
          break;
      }
  }

  this.options = options = this.defaultOptions(options);

  if (uris.length < 2) {
    this.error(new Error('Please provide comma-separated URIs'), callback);
    return this;
  }

  this.replica = true;
  this.host = [];
  this.port = [];

  uris.forEach(function (uri) {
    // handle missing protocols
    if (!rgxProtocol.test(uri))
      uri = 'mongodb://' + uri;

    var uri = url.parse(uri);

    self.host.push(uri.hostname);
    self.port.push(uri.port || 27017);

    if (!self.name && uri.pathname && uri.pathname.replace(/\//g, ''))
      self.name = uri.pathname.replace(/\//g, '');

    if (!self.user && uri.auth) {
      var auth = uri.auth.split(':');
      self.user = auth[0];
      self.pass = auth[1];
    }
  });

  if (!this.name) {
    this.error(new Error('No database name provided for replica set'), callback);
    return this;
  }

  this._open(callback);
  return this;
}