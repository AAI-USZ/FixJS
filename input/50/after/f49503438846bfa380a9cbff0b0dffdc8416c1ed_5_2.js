function MethodClosureClass(runtime, scope, instance, baseClass) {
    var c = new runtime.domain.system.Class("MethodClosure", runtime.domain.system.MethodClosure);
    c.extendBuiltin(baseClass);
    return c;
  }