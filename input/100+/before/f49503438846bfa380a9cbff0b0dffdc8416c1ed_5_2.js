function FunctionClass(runtime, scope, instance, baseClass) {
    var c = new Class("Function", Function, C(Function));
    c.baseClass = baseClass;

    var m = Function.prototype;
    defineNonEnumerableProperty(m, "get prototype", function () { return this.prototype; });
    defineNonEnumerableProperty(m, "set prototype", function (p) { this.prototype = p; });
    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    c.nativeMethods = m;
    c.isInstance = function (value) {
      return typeof value === "function";
    };

    return c;
  }