function DateClass(runtime, scope, instance, baseClass) {
    var c = new Class("Date", Date, C(Date));
    c.baseClass = baseClass;
    c.nativeMethods = Date.prototype;
    c.nativeStatics = Date;
    return c;
  }