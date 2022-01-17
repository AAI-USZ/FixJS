function eventRouteModules(req, res, next) {

  // Ignore static content
  // TODO : Make this more connect friendly or at least configurable
  if(req.url.match(/^\/images|^\/js|^\/css|^\/favicon.ico/)) {
    next();
    return;
  }

  req.timeStart = new Date();

  // Attach our event listener to this request
  attachRequestEvents(req, res, next);

  // Initialise the response re. matches
  // Later used to decide to show 404
  res.routeMatched = false;

  // Now, route each of the modules
  for(var module in calipso.modules) {
    routeModule(req,res,module,false,false,next);
  }

}