function uintClass(runtime, scope, instance, baseClass) {
    function uint(x) {
      return Number(x) >>> 0;
    }

    var c = new runtime.domain.system.Class("uint", uint, C(uint));
    c.extend(baseClass);
    c.defaultValue = 0;
    c.isInstance = function (value) {
      return (value >>> 0) === value;
    };
    c.coerce = uint;
    return c;
  }