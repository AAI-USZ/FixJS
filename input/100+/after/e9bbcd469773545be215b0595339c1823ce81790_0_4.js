function(isPreventable, isUnicast, hasMemory) {
      var adder, callbackFlags, callbackFns, callbacks, firer, memory, oldAdder, oldFirer, remover, that;
      that = {
        isPreventable: !!isPreventable,
        isUnicast: !!isUnicast,
        hasMemory: !!hasMemory
      };
      callbackFlags = [];
      if (that.isPreventable) callbackFlags.push("stopOnFalse");
      callbacks = $.Callbacks(callbackFlags.join(" "));
      adder = function(listener) {
        return callbacks.add(listener);
      };
      remover = function(listener) {
        return callbacks.remove(listener);
      };
      firer = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return callbacks.fire.apply(callbacks, args);
      };
      if (that.isUnicast) {
        callbackFns = [];
        adder = function(listener) {
          return callbackFns.push(listener);
        };
        remover = function(listener) {
          var fn;
          return callbackFns = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = callbackFns.length; _i < _len; _i++) {
              fn = callbackFns[_i];
              if (fn !== listener) _results.push(fn);
            }
            return _results;
          })();
        };
        callbacks.add(function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (callbackFns.length > 0) {
            return callbackFns[0].apply(callbackFns, args);
          }
        });
      } else if (that.hasMemory) {
        memory = [];
        oldAdder = adder;
        adder = function(listener) {
          var m, _i, _len;
          for (_i = 0, _len = memory.length; _i < _len; _i++) {
            m = memory[_i];
            listener.apply(null, m);
          }
          return oldAdder(listener);
        };
        oldFirer = firer;
        firer = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          memory.push(args);
          return oldFirer.apply(null, args);
        };
      }
      that.addListener = adder;
      that.removeListener = remover;
      that.fire = firer;
      return that;
    }