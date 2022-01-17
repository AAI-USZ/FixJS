function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.after) != null) {
        _ref.apply(this, arguments);
      }
      if (Luca.enableBootstrap === true && this.containerClassName) {
        return this.$el.children().wrap('<div class="#{ containerClassName }" />');
      }
    }