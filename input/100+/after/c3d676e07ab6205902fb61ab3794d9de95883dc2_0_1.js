function() {
      var _ref;
      Rivets.config.adapter.subscribe(this.model, this.keypath, this.set);
      if (Rivets.config.preloadData) {
        this.set(Rivets.config.adapter.read(this.model, this.keypath));
      }
      if (_ref = this.type, __indexOf.call(bidirectionals, _ref) >= 0) {
        if (window.addEventListener) {
          return this.el.addEventListener('change', this.publish);
        } else {
          return this.el.attachEvent('change', this.publish);
        }
      }
    }