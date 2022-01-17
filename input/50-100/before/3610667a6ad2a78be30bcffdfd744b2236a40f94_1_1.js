function() {
      var method;
      method = actions[methodName];
      if (method == null) {
        throw new Error("Unable to find '" + req.method + "' method in exports.actions");
      }
      if (typeof method !== 'function') {
        throw new Error("The '" + req.method + "' method in exports.actions must be a function");
      }
      return method.apply(method, req.params);
    }