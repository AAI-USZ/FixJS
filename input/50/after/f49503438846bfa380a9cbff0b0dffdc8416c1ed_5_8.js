function MathClass(runtime, scope, instance, baseClass) {
    var c = new runtime.domain.system.Class("Math");
    c.nativeStatics = Math;
    return c;
  }