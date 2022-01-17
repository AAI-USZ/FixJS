function() {
      var routerStartEvent, _ref;
      if ((_ref = Luca.containers.Viewport.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if ((this.router != null) && this.autoStartHistory === true) {
        routerStartEvent = this.startRouterOn || "after:render";
        if (routerStartEvent === "before:render") {
          return Backbone.history.start();
        } else {
          return this.bind(routerStartEvent, function() {
            return Backbone.history.start();
          });
        }
      }
    }