function(req, i, head){
  var method = req.method.toLowerCase()
    , url = parse(req)
    , path = url.pathname
    , routes = this.map
    , i = i || 0
    , route;

  // HEAD support
  if (!head && 'head' == method) {
    route = this.matchReq(req, i, true);
    if (route) return route;
     method = 'get';
  }

  // routes for this method
  if (routes = routes[method]) {

    // matching routes
    for (var len = routes.length; i < len; ++i) {
      route = routes[i];
      if (route.match(path)) {
        req._route_index = i;
        return route;
      }
    }
  }
}