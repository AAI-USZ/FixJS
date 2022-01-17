function() {
    var a;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      a = [42, ["foo", true]];
      eq(a[1][0], "foo", "nested array get abides by contract");
      return throws((function() {
        return a[1][0] = 42;
      }), "nested array set violates contract");
    }
  }