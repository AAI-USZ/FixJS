function uintClass(runtime, scope, instance, baseClass) {
    function uint(x) {
      return Number(x) >>> 0;
    }

    var c = new Class("uint", uint, C(uint));
    c.baseClass = baseClass;
    c.defaultValue = 0;
    c.isInstance = function (value) {
      return (value >>> 0) === value;
    };
    c.coerce = uint;
    return c;
  }