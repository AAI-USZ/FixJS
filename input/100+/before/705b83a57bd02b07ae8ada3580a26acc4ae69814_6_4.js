function() {
    var a;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      a = __contracts.guard(__contracts.arr([Num, Str]),[42, "foo"]);
      eq(a[0], 42, "array get abides by contract");
      throws((function() {
        return a[0] = "foo";
      }), "array set violates contract");
      a = __contracts.guard(__contracts.arr([Num, Str]),[42, "foo"]);
      eq(a[0], 42, "array get abides by contract");
      return throws((function() {
        return a[0] = "foo";
      }), "array set violates contract");
    }
  }