function() {
    var a, b;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      a = __contracts.guard(__contracts.arr([__contracts.___(Num)]),[42, 22, 24]);
      eq(a[0], 42, "array get abides by contract");
      throws((function() {
        return a[0] = "foo";
      }), "array set violates contract");
      b = __contracts.guard(__contracts.arr([Str, Num, __contracts.___(Bool)]),["foo", 42, false, true, false]);
      eq(b[0], "foo", "get abides by contract");
      eq(b[2], false, "get abides by contract");
      ok((b[0] = "bar"), "set abides by contract");
      ok((b[2] = true), "set abides by contract");
      throws((function() {
        return b[0] = 42;
      }), "set violates contract");
      throws((function() {
        return b[2] = "foo";
      }), "set violates contract");
      return throws((function() {
        var c;
        return c = __contracts.guard(__contracts.arr([__contracts.___(Bool), Str]),["foo", 42]);
      }), "cannot construct a contract with ... in anything other than the last position of the array");
    }
  }