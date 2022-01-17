function (req, res, options) {
  options = options || {};

  //
  // Check the proxy table for this instance to see if we need
  // to get the proxy location for the request supplied. We will
  // always ignore the proxyTable if an explicit `port` and `host`
  // arguments are supplied to `proxyRequest`.
  //
  if (this.proxyTable && !options.host) {
    location = this.proxyTable.getProxyLocation(req);

    //
    // If no location is returned from the ProxyTable instance
    // then respond with `404` since we do not have a valid proxy target.
    //
    if (!location) {
      try {
        res.writeHead(404);
        res.end();
      }
      catch (er) {
        console.error("res.writeHead/res.end error: %s", er.message);
      }

      return;
    }

    //
    // When using the ProxyTable in conjunction with an HttpProxy instance
    // only the following arguments are valid:
    //
    // * `proxy.proxyRequest(req, res, { host: 'localhost' })`: This will be skipped
    // * `proxy.proxyRequest(req, res, { buffer: buffer })`: Buffer will get updated appropriately
    // * `proxy.proxyRequest(req, res)`: Options will be assigned appropriately.
    //
    options.port = location.port;
    options.host = location.host;
  }

  var key = this._getKey(options),
      proxy;

  if ((this.target && this.target.https)
    || (location && location.protocol === 'https')) {
    options.target = options.target || {};
    options.target.https = true;
  }

  if (!this.proxies[key]) {
    this.add(options);
  }

  proxy = this.proxies[key];
  proxy.proxyRequest(req, res, options.buffer);
}