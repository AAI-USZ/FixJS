function(){
      var args, param, type, that;
      args = __slice.call(arguments);
      if (length === 1 && typeof 0 === 'object') {
        args = args[0];
      }
      return func.call((function(){
        var __ref, __results = {};
        for (param in __ref = spec) {
          type = __ref[param];
          __results[param] = (that = args[param]) != null
            ? that
            : args.shift();
        }
        return __results;
      }()), this);
    }