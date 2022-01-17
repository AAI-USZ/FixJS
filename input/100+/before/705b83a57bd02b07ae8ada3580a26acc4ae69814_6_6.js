function() {
    var MyEven, NumId, id, idEven;
    NumId = __contracts.fun([Num], Num, {});
    id = __contracts.guard(NumId,function(x) {
      return x;
    });
    eq(id(42), 42, "abides by contract");
    throws((function() {
      return id("foo");
    }), "violates contract");
    id = __contracts.guard(__contracts.fun([
      (function(x) {
        return typeof x === 'number';
      }).toContract()
    ], Num, {}),function(x) {
      return x;
    });
    eq(id(42), 42, "abides by contract");
    throws((function() {
      return id("foo");
    }), "violates contract");
    MyEven = (function(x) {
      return x % 2 === 0;
    }).toContract();
    idEven = __contracts.guard(__contracts.fun([MyEven], MyEven, {}),function(x) {
      return x;
    });
    eq(idEven(4), 4, "abides by contract");
    throws((function() {
      return idEven(3);
    }), "violates contract");
    MyEven = function(x) {
      return x % 2 === 0;
    };
    idEven = __contracts.guard(__contracts.fun([(MyEven).toContract()], (MyEven).toContract(), {}),function(x) {
      return x;
    });
    eq(idEven(4), 4, "abides by contract");
    return throws((function() {
      return idEven(3);
    }), "violates contract");
  }