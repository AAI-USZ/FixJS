function (runtime, scope, instance, baseClass) {
      var c = new Class(name, instance, CC(instance));
      c.extend(baseClass);
      c.nativeMethods = {
        getStackTrace: function () {
          return "TODO: geStackTrace";
        }
      };
      c.nativeStatics = {
        getErrorMessage: function() {
          return "TODO: getErrorMessage";
        }
      };
      return c;
    }