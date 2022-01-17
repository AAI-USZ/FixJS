function BooleanClass(scope, instance, baseClass) {
    var c = new Class("Boolean", Boolean, C(Boolean));
    c.baseClass = baseClass;
    c.nativeMethods = Boolean.prototype;
    return c;
  }