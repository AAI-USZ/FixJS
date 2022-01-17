function() {
      var args, event, fn, _i, _len, _ref, _ref1;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!((_ref = this._events) != null ? _ref[event] : void 0)) {
        return this;
      }
      _ref1 = this._events[event];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        fn = _ref1[_i];
        if (fn) {
          fn.apply(this, args);
        }
      }
      return this;
    }