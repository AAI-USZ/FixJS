function() {
      var args, event, l, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.events[event]) {
        return false;
      }
      _ref = this.events[event];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        l.apply(null, args);
      }
      return true;
    }