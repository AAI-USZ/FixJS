function ArrayClass(runtime, scope, instance, baseClass) {
    var c = new Class("Array", Array, C(Array));
    c.baseClass = baseClass;

    var m = Array.prototype;
    defineNonEnumerableProperty(m, "get length", function() { return this.length; });
    defineNonEnumerableProperty(m, "set length", function(l) { this.length = l; });
    c.nativeMethods = m;

    return c;
  }