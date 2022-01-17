function() {
    var g;
    g = __contracts.guard(__contracts.fun([
      __contracts.object({
        toString: __contracts.fun([Any], Str, {})
      }, {})
    ], Str, {}),function(s) {
      return s.toString();
    });
    return throws((function() {
      return g("foo");
    }), "foo is a string but expects object");
  }