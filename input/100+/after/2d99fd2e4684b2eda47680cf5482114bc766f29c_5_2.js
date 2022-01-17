function(method, path, action){
      var route, eq, that;
      switch (false) {
      case !(__in(method.toLowerCase(), '*') || arguments || methods):
        route = new Route(method, path, action);
        eq = __bind(route, 'equals');
        if (that = find(eq, this.routes)) {
          return that.action = route.action, route;
        } else {
          return this.routes.push(route);
        }
        break;
      default:
        throw new Error("invalid method " + method);
      }
    }