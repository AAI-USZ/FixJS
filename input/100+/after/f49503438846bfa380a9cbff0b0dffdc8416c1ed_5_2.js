function BooleanClass(runtime, scope, instance, baseClass) {
    var c = new runtime.domain.system.Class("Boolean", Boolean, C(Boolean));
    c.extendBuiltin(baseClass);
    c.nativeMethods = Boolean.prototype;
    c.coerce = Boolean;
    return c;
  }