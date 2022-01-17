function (runtime, scope, instance, baseClass) {
      var c = new runtime.domain.system.Class(name, instance, CC(instance));
      c.extend(baseClass);
      c.nativeMethods = {
        getStackTrace: function () {
          return "TODO: getStackTrace";
        }
      };
      c.nativeStatics = {
        getErrorMessage: function() {
          return "TODO: getErrorMessage";
        }
      };
      return c;
    }