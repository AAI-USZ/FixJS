function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.after) != null) {
        _ref.apply(this, arguments);
      }
      if (Luca.enableBootstrap === true) {
        return this.$el.children().wrap('<div class="container" />');
      }
    }