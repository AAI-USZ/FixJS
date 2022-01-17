function (host, database, port, options, callback) {
  var self = this
    , uri;

  if ('string' === typeof database) {
    switch (arguments.length) {
      case 2:
        port = 27017;
      case 3:
        switch (typeof port) {
          case 'function':
            callback = port, port = 27017;
            break;
          case 'object':
            options = port, port = 27017;
            break;
        }
        break;
      case 4:
        if ('function' === typeof options)
          callback = options, options = {};
    }
  } else {
    switch (typeof database) {
      case 'function':
        callback = database, database = undefined;
        break;
      case 'object':
        options = database;
        database = undefined;
        callback = port;
        break;
    }

    if (!rgxProtocol.test(host)) {
      host = 'mongodb://' + host;
    }

    uri = url.parse(host);
    host = uri.hostname;
    port = uri.port || 27017;
    database = uri.pathname && uri.pathname.replace(/\//g, '');
  }

  this.options = this.defaultOptions(options);

  // make sure we can open
  if (STATES.disconnected !== this.readyState) {
    var err = new Error('Trying to open unclosed connection.');
    err.state = this.readyState;
    this.error(err, callback);
    return this;
  }

  if (!host) {
    this.error(new Error('Missing connection hostname.'), callback);
    return this;
  }

  if (!database) {
    this.error(new Error('Missing connection database.'), callback);
    return this;
  }

  // handle authentication
  if (uri && uri.auth) {
    var auth = uri.auth.split(':');
    this.user = auth[0];
    this.pass = auth[1];

  // Check hostname for user/pass
  } else if (/@/.test(host) && /:/.test(host.split('@')[0])) {
    host = host.split('@');
    var auth = host.shift().split(':');
    host = host.pop();
    this.user = auth[0];
    this.pass = auth[1];

  // user/pass options
  } else if (options && options.user && options.pass) {
    this.user = options.user;
    this.pass = options.pass;

  } else {
    this.user = this.pass = undefined;
  }

  this.name = database;
  this.host = host;
  this.port = port;

  this._open(callback);
  return this;
}