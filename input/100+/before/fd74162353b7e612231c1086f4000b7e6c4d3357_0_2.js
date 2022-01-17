function(route) {
        var p, r, routes;
        route = expandRoute(route, '.js', context.js.root);
        if (route.match(REMOTE_PATH)) {
          routes = [route];
        } else if (srcIsRemote) {
          routes = ["" + _this.options.src + "/" + route];
        } else {
          routes = (function() {
            var _i, _len, _ref, _results;
            _ref = this.compileJS(route);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              p = _ref[_i];
              _results.push(this.options.servePath + p);
            }
            return _results;
          }).call(_this);
        }
        if (_this.options.pathsOnly) return routes;
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = routes.length; _i < _len; _i++) {
            r = routes[_i];
            _results.push("<script src='" + r + "'></script>");
          }
          return _results;
        })()).join('\n');
      }