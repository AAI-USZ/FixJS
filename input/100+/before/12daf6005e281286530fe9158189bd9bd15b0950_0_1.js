function callNative(funcName, sql, args, callback) {
      var preparedArgs = prepareArgs(args);

      if (preparedArgs instanceof Windows.Foundation.Collections.PropertySet) {
        return connection[funcName + "Map"](sql, preparedArgs, callback);
      }

      return connection[funcName + "Vector"](sql, preparedArgs, callback);
    }