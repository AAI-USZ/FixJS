function() {
        if (_.isFunction(_this.router.before)) {
          _this.router.before.call(_this);
        }
        _this.router.trigger('navigate');
        window.scrollTo(0, 0);
        return __super.apply(Backbone.history, arguments);
      }