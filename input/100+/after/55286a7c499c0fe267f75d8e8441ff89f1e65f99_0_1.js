function (options) {
  events.EventEmitter.call(this);

  this.silent       = options.silent || options.silent !== true;
  this.target       = options.target || {};
  this.hostnameOnly = options.hostnameOnly === true;

  if (typeof options.router === 'object') {
    //
    // If we are passed an object literal setup
    // the routes with RegExps from the router
    //
    this.setRoutes(options.router);
  }
  else if (typeof options.router === 'string') {
    //
    // If we are passed a string then assume it is a
    // file path, parse that file and watch it for changes
    //
    var self = this;
    this.routeFile = options.router;
    this.setRoutes(JSON.parse(fs.readFileSync(options.router)).router);

    fs.watchFile(this.routeFile, function () {
      fs.readFile(self.routeFile, function (err, data) {
        if (err) {
          self.emit('error', err);
        }

        self.setRoutes(JSON.parse(data).router);
        self.emit('routes', self.hostnameOnly === false ? self.routes : self.router);
      });
    });
  }
  else {
    throw new Error('Cannot parse router with unknown type: ' + typeof router);
  }
}