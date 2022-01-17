function (error, Resource) {
    if (error) return next(utils.httpError(500, error));

    if (!Resource.prototype.hasOwnProperty(route.method)) {
      var err = new Error('change table method ' + route.method + ' do not exist in ' + route.path);
      return self.emit('error', utils.httpError(404, err));
    }

    if (res.statusCode < 400) res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    var stream = self.open();
    if (stream) {
      // Execute change table method with given arguments
      var changeTable = new Resource(stream, piccolo, nodeModules);
          changeTable[route.method].apply(changeTable, route.args);
    }
  }