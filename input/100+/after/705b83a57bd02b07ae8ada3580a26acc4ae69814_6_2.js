function() {
    var o;
    o = {
      a: {
        z: 42
      },
      b: true
    };
    eq(o.a.z, 42, "get abides by contract");
    throws((function() {
      return o.a.z = "foo";
    }), "set violates contract");
    o = {
      a: 42,
      b: "foo"
    };
    eq(o.a, 42, "newline syntax works fine for get");
    return throws((function() {
      return o.a = "foo";
    }), "newline syntax works fine for set");
  }