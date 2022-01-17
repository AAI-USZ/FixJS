function (router) {
  if (!router) {
    throw new Error('Cannot update ProxyTable routes without router.');
  }

  this.router = router;

  if (this.hostnameOnly === false) {
    var self = this;
    this.routes = [];

    Object.keys(router).forEach(function (path) {
      var route = new RegExp('^' + path, 'i');

      self.routes.push({
        route: route,
        target: router[path],
        path: path
      });
    });
  }
}