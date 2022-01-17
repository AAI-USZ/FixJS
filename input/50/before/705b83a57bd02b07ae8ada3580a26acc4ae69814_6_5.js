function, first order", function() {
    var badRng, even, id, noarg, noarg_bad, option;
    id = __contracts.guard(__contracts.fun([Str], Str, {}),function(x) {
      return x;
    });
    eq(id("foo"), "foo", "abides by contract");
    throws((function() {
      return id(4);
    }), "violates domain");
    badRng = __contracts.guard(__contracts.fun([Str], Num, {}),function(x) {
      return x;
    });
    throws((function() {
      return badRng("foo");
    }), "violates range");
    option = __contracts.guard(__contracts.fun([Num, __contracts.opt(Str)], Bool, {}),function(n, s) {
      return true;
    });
    ok(option(42, "foo"), "optional abides by contract");
    ok(option(42), "does not include optional arg");
    throws((function() {
      return option(42, 42);
    }), "violates optional argument");
    even = __contracts.guard(__contracts.fun([
      (function(x) {
        return (x % 2) === 0;
      }).toContract()
    ], Num, {}),function(x) {
      return x;
    });
    eq(even(4), 4, "abides by contract");
    throws((function() {
      return even(3);
    }), "violates flat contract");
    noarg = __contracts.guard(__contracts.fun([], Num, {}),function() {
      return 42;
    });
    eq(noarg(), 42, "abides by contract");
    noarg_bad = __contracts.guard(__contracts.fun([], Num, {}),function() {
      return "foo";
    });
    return throws((function() {
      return noarg_bad();
    }), "violates contract");
  }