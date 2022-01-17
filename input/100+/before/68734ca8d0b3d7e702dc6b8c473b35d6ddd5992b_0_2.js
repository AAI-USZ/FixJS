function() {
      var args, event, reporter, reporters, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      reporters = joePrivate.getReporters();
      if (!reporters.length) {
        console.log("Joe has no reporters loaded, so cannot log anything...");
        joe.exit(1);
        return this;
      }
      for (_i = 0, _len = reporters.length; _i < _len; _i++) {
        reporter = reporters[_i];
        if ((_ref = reporter[event]) != null) {
          _ref.apply(reporter, args);
        }
      }
      return this;
    }