function() {
    var f;
    f = __contracts.guard(__contracts.fun([Num], __contracts.or(Num, Bool), {}),function(x) {
      if (x === 2) {
        return 2;
      } else if (x === 3) {
        return false;
      } else {
        return "bad state";
      }
    });
    eq(f(2), 2, "abides by contract");
    eq(f(3), false, "abides by contract");
    throws((function() {
      return f(4);
    }), "violates contract");
    f = __contracts.guard(__contracts.fun([
      __contracts.and(Num, (function(x) {
        return x > 42;
      }).toContract())
    ], Num, {}),function(x) {
      return x;
    });
    eq(f(43), 43, "abides by contract");
    return throws((function() {
      return f(1);
    }), "violates contract");
  }