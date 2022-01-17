function callNative(funcName, sql, args, callback) {
      var result, preparedArgs = prepareArgs(args);

      try {
        if (preparedArgs instanceof Windows.Foundation.Collections.PropertySet) {
          result = connection[funcName + "Map"](sql, preparedArgs, callback);
        } else {
          result = connection[funcName + "Vector"](sql, preparedArgs, callback);
        }
        return WinJS.Promise.wrap(result);
      } catch (e) {
        return WinJS.Promise.wrapError(e);
      }

    }