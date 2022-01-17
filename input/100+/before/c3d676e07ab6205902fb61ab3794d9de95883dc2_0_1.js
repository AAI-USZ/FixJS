function() {
      var _ref;
      Rivets.config.adapter.subscribe(this.model, this.keypath, this.set);
      if (Rivets.config.preloadData) {
        this.set(Rivets.config.adapter.read(this.model, this.keypath));
      }
      if (_ref = this.type, __indexOf.call(bidirectionals, _ref) >= 0) {
        return this.el.addEventListener('change', this.publish);
      }
    }