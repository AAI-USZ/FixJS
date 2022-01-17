function (path) {
      var route = new RegExp('^' + path, 'i');

      self.routes.push({
        route: route,
        target: router[path],
        path: path
      });
    }