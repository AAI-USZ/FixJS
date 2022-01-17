function(spec, func){
    var spec, func, out, __ref;
    __ref = spec instanceof Function
      ? [spec, {}]
      : [func, spec], func = __ref[0], spec = __ref[1];
    out = function(){
      var args, param, type, that;
      args = __slice.call(arguments);
      if (arguments.length === 1 && typeof arguments[0] === 'object') {
        __compose((args),(0));
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
    };
    out.expects = spec;
    return out;
  }