function pass(i, err){
    var paramCallbacks
      , paramIndex = 0
      , paramVal
      , route
      , keys
      , key
      , ret;

    // match next route
    function nextRoute(err) {
      pass(req._route_index + 1, err);
    }

    // match route
    req.route = route = self.matchReq(req, i);

    // implied OPTIONS
    if (!route && 'OPTIONS' == req.method) return self._options(req, res);

    // no route
    if (!route) return next(err);
    debug('matched %s %s', route.method, route.path);

    // we have a route
    // start at param 0
    req.params = route.params;
    keys = route.keys;
    i = 0;

    // param callbacks
    function param(err) {
      paramIndex = 0;
      key = keys[i++];
      paramVal = key && req.params[key.name];
      paramCallbacks = key && params[key.name];

      try {
        if ('route' == err) {
          nextRoute();
        } else if (err) {
          i = 0;
          callbacks(err);
        } else if (paramCallbacks && undefined !== paramVal) {
          paramCallback();
        } else if (key) {
          param();
        } else {
          i = 0;
          callbacks();
        }
      } catch (err) {
        param(err);
      }
    };

    param(err);
    
    // single param callbacks
    function paramCallback(err) {
      var fn = paramCallbacks[paramIndex++];
      if (err || !fn) return param(err);
      fn(req, res, paramCallback, paramVal, key.name);
    }

    // invoke route callbacks
    function callbacks(err) {
      var fn = route.callbacks[i++];
      try {
        if ('route' == err) {
          nextRoute();
        } else if (err && fn) {
          if (fn.length < 4) return callbacks(err);
          fn(err, req, res, callbacks);
        } else if (fn) {
          fn(req, res, callbacks);
        } else {
          nextRoute(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }
  }