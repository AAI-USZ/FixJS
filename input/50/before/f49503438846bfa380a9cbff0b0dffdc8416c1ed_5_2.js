function MethodClosureClass(runtime, scope, instance, baseClass) {
    var c = new Class("MethodClosure", MethodClosure);
    c.extend(baseClass);
    return c;
  }