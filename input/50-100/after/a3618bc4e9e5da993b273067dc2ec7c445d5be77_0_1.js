function(route) {
        route = expandRoute(route, '.css', context.css.root);
        if (!route.match(REMOTE_PATH)) {
          route = _this.options.servePath + _this.compileCSS(route);
        }
        if (_this.options.pathsOnly) {
          return route;
        }
        return "<link rel='stylesheet' href='" + route + "'>";
      }