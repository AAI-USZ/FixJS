function() {
    var a;
    a = __contracts.guard(__contracts.fun([
      __contracts.object({
        a: Str,
        b: Str
      }, {})
    ], Any, {}),function(b) {
      return console.log(b);
    });
    return blames((function() {
      return a(null);
    }));
  }