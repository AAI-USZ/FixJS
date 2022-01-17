function eventRouteModules(req, res, next) {

  // Ignore static content
  // TODO : Make this more connect friendly or at least configurable
  // STATIC content may or may not be static. We should route it normally for now.
  //if (req.url.match(/^\/images|^\/js|^\/css|^\/favicon.ico|png$|jpg$|gif$|css$|js$/)) {
  //  return next();
  //}

  req.timeStart = new Date();

  // Attach our event listener to this request
  attachRequestEvents(req, res);

  // Initialise the response re. matches
  // Later used to decide to show 404
  res.routeMatched = false;

  // Store our callback here
  req.routeComplete = function(res) {
    if(!res.finished) next();
  };

  // Route 'first' modules that fire before all others
  // These first modules can stop the routing of all others
  doFirstModules(req, res, function(err) {

    var iterator = function(module, cb) {
       routeModule(req, res, module, false, false, cb);
    }

    calipso.lib.async.map(calipso.lib._.keys(calipso.modules), iterator, function(err, result) {
      // Not important
    })

  });

}