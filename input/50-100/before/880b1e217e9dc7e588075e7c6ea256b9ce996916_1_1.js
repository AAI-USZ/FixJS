function() {
      Component.prototype.initialize.apply(this, arguments);
      return this.set("type", "Video");
    }