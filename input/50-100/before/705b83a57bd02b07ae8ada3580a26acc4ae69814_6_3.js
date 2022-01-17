function() {
    var f;
    f = __contracts.guard(__contracts.fun([
      __contracts.object({
        foo: Str
      }, {})
    ], Str, {}),function(o) {
      return o.foo;
    });
    eq(f({
      foo: "bar"
    }), "bar", "correct object");
    return throws((function() {
      return f("string");
    }), "string instead of an object, but should complain about missing property");
  }