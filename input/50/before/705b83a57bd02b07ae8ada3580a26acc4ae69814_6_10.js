function, call/new only", function() {
    var callOnly, newOnly, x;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      callOnly = __contracts.guard(__contracts.fun([Num], Num, {
        callOnly: true
      }),function(x) {
        return x;
      });
      eq(callOnly(4), 4, "abides by contract");
      throws((function() {
        return new callOnly(4);
      }), Error, "violates contract by calling new");
      newOnly = __contracts.guard(__contracts.fun([Num], __contracts.object({
        a: Num
      }, {}), {
        newOnly: true
      }),function(x) {
        return this.a = x;
      });
      x = new newOnly(42);
      eq(x.a, 42, "abides by contract");
      return throws((function() {
        return newOnly(42);
      }), "violates contract by not calling new");
    }
  }