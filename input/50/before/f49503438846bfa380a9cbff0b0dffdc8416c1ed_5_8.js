function MathClass(runtime, scope, instance, baseClass) {
    var c = new Class("Math");
    c.baseClass = baseClass;
    c.nativeStatics = Math;
    return c;
  }