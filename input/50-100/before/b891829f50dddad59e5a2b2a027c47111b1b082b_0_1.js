function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return Boiler.inHook.apply(Boiler, [pot].concat(__slice.call(args)));
        }