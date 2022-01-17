function() {
    var obj;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      obj = {
        a: 42,
        b: null,
        c: (function(x) {
          return {
            a: "foo"
          };
        })
      };
      obj.b = obj;
      eq(obj.a, 42, "abides by contract");
      eq(obj.b.a, 42, "abides by recursive portion of contract");
      throws((function() {
        return obj.b.a = "foo";
      }), "violates contract");
      return throws((function() {
        return obj.c().a;
      }), "violates contract");
    }
  }