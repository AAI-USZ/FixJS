function() {
      var _ref, _ref2, _ref3,
        _this = this;
      if ((_ref = Luca.containers.Viewport.prototype.afterComponents) != null) {
        _ref.apply(this, arguments);
      }
      if ((_ref2 = this.getMainController()) != null) {
        _ref2.bind("after:card:switch", function(previous, current) {
          return _this.state.set({
            active_section: current.name
          });
        });
      }
      return (_ref3 = this.getMainController()) != null ? _ref3.each(function(component) {
        if (component.ctype.match(/controller$/)) {
          return component.bind("after:card:switch", function(previous, current) {
            return _this.state.set({
              active_sub_section: current.name
            });
          });
        }
      }) : void 0;
    }