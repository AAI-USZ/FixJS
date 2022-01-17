function(value) {
        var key;
        key = Ext.isFunction(hashFn) ? hashFn.apply(scope, arguments) : value;
        if (!(key in memo)) {
          memo[key] = fn.apply(scope, arguments);
        }
        return memo[key];
      }