function StringClass(runtime, scope, instance, baseClass) {
    var c = new Class("String", String, C(String));
    c.baseClass = baseClass;

    var m = String.prototype;
    defineNonEnumerableProperty(m, "get length", function () { return this.length; });
    c.nativeMethods = m;
    c.nativeStatics = String;
    c.isInstance = function (value) {
      return typeof value === "string";
    };

    return c;
  }