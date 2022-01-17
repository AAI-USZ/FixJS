function (options) {
  var self = this,
      key = this._getKey(options);

  //
  // TODO: Consume properties in `options` related to the `ProxyTable`.
  //
  options.target       = options.target       || {};
  options.target.host  = options.target.host  || options.host;
  options.target.port  = options.target.port  || options.port;
  options.target.https = this.target && this.target.https ||
                         options.target && options.target.https;

  //
  // Setup options to pass-thru to the new `HttpProxy` instance
  // for the specified `options.host` and `options.port` pair.
  //
  ['https', 'enable', 'forward'].forEach(function (key) {
    if (options[key] !== false && self[key]) {
      options[key] = self[key];
    }
  });

  this.proxies[key] = new HttpProxy(options);

  if (this.listeners('proxyError').length > 0) {
    this.proxies[key].on('proxyError', this.emit.bind(this, 'proxyError'));
  }

  if (this.listeners('webSocketProxyError').length > 0) {
    this.proxies[key].on('webSocketProxyError', this.emit.bind(this, 'webSocketProxyError'));
  }

  this.proxies[key].on('start', this.emit.bind(this, 'start'));
  this.proxies[key].on('forward', this.emit.bind(this, 'forward'));
  this.proxies[key].on('end', this.emit.bind(this, 'end'));
}