function NumberClass(runtime, scope, instance, baseClass) {
    var c = new Class("Number", Number, C(Number));
    c.baseClass = baseClass;
    c.nativeMethods = Number.prototype;
    c.defaultValue = Number(0);
    c.isInstance = function (value) {
      return typeof value === "number";
    };
    c.coerce = Number;
    return c;
  }