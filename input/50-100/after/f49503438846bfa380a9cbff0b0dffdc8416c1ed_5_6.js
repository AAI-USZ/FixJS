function DateClass(runtime, scope, instance, baseClass) {
    var c = new runtime.domain.system.Class("Date", Date, C(Date));
    c.extendBuiltin(baseClass);
    c.nativeMethods = Date.prototype;
    c.nativeStatics = Date;
    return c;
  }