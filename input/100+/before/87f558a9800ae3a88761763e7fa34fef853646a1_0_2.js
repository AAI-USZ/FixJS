function() {
      var _ref;
      Rivets.config.adapter.unsubscribe(this.model, this.keypath, this.set);
      if (_ref = this.type, __indexOf.call(bidirectionals, _ref) >= 0) {
        return this.el.removeEventListener('change', this.publish);
      }
    }