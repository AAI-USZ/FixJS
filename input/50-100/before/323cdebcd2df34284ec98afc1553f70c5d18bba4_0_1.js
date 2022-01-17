function() {
      var ctor, ctors, _i, _len;
      ctors = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = ctors.length; _i < _len; _i++) {
        ctor = ctors[_i];
        if (this["instanceof"](ctor)) {
          return true;
        }
      }
      return false;
    }