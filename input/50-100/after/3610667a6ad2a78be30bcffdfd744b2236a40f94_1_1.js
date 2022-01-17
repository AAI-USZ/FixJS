function() {
      var method;
      method = actions[methodName];
      if (method == null) {
        return res(new Error("Unable to find '" + req.method + "' method in exports.actions"));
      }
      if (typeof method !== 'function') {
        return res(new Error("The '" + req.method + "' method in exports.actions must be a function"));
      }
      return method.apply(method, req.params);
    }