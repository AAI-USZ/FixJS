function intClass(scope, instance, baseClass) {
    function int(x) {
      return Number(x) | 0;
    }

    var c = new Class("int", int, C(int));
    c.baseClass = baseClass;
    c.defaultValue = 0;
    c.isInstance = function (value) {
      return (value | 0) === value;
    };
    c.coerce = int;
    return c;
  }