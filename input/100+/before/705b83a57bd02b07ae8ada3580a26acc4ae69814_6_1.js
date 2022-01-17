function() {
    var o;
    o = __contracts.guard(__contracts.object({
      a: Str,
      b: Num
    }, {}),{
      a: "foo",
      b: 42
    });
    eq(o.a, "foo", "get abides by contract");
    eq(o.b, 42, "get abides by contract");
    ok(o.a = "bar", "set abides by contract");
    throws((function() {
      return o.a = 42;
    }), "set violates contract");
    throws((function() {
      var o_construct_bad;
      return o_construct_bad = __contracts.guard(__contracts.object({
        a: Num,
        b: Bool
      }, {}),{
        a: 42
      });
    }), "missing property guarenteed in contract");
    o = __contracts.guard(__contracts.object({
      a: Str,
      b: Num
    }, {}),{
      a: "foo",
      b: 42
    });
    eq(o.a, "foo", "get abides by contract");
    eq(o.b, 42, "get abides by contract");
    ok(o.a = "bar", "set abides by contract");
    throws((function() {
      return o.a = 42;
    }), "set violates contract");
    throws((function() {
      var o_construct_bad;
      return o_construct_bad = __contracts.guard(__contracts.object({
        a: Num,
        b: Bool
      }, {}),{
        a: 42
      });
    }), "missing property guarenteed in contract");
    o = __contracts.guard(__contracts.object({
      a: Str,
      b: __contracts.opt(Num)
    }, {}),{
      a: "foo"
    });
    eq(o.a, "foo", "get abides by contract");
    ok((o.b = 42), "set abides by contract");
    return throws((function() {
      return o.b = "foo";
    }), "set violates contract");
  }