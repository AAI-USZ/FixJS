function interpretedMethod(interpreter, methodInfo, scope) {
      var fn = function () {
        var global = (this === jsGlobal ? scope.global.object : this);
        var args;
        if (hasDefaults && arguments.length < defaults.length) {
          args = Array.prototype.slice.call(arguments);
          args = args.concat(defaults.slice(arguments.length - defaults.length));
        } else {
          args = arguments;
        }
        return interpreter.interpretMethod(global, methodInfo, scope, args);
      };
      fn.instance = fn;
      return fn;
    }