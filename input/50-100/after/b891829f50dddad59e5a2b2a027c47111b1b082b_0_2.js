function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          Boiler.outHook.apply(Boiler, [pot].concat(__slice.call(args)));
          return module_.__boiler_hook_out = (function() {});
        }