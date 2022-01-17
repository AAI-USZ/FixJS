function() {
    var MyEven, id, idEven;
    id = function(x) {
      return x;
    };
    eq(id(42), 42, "abides by contract");
    throws((function() {
      return id("foo");
    }), "violates contract");
    id = function(x) {
      return x;
    };
    eq(id(42), 42, "abides by contract");
    throws((function() {
      return id("foo");
    }), "violates contract");
    idEven = function(x) {
      return x;
    };
    eq(idEven(4), 4, "abides by contract");
    throws((function() {
      return idEven(3);
    }), "violates contract");
    MyEven = function(x) {
      return x % 2 === 0;
    };
    idEven = function(x) {
      return x;
    };
    eq(idEven(4), 4, "abides by contract");
    return throws((function() {
      return idEven(3);
    }), "violates contract");
  }