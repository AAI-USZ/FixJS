function NumberClass(runtime, scope, instance, baseClass) {
    var c = new runtime.domain.system.Class("Number", Number, C(Number));
    c.extendBuiltin(baseClass);
    c.nativeMethods = Number.prototype;
    c.defaultValue = Number(0);
    c.isInstance = function (value) {
      return typeof value === "number";
    };
    c.coerce = Number;
    return c;
  }