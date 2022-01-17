function DoubleVectorClass(scope, instance, baseClass) {
    return createVectorClass(toplevel.getTypeByName(Multiname.fromSimpleName("Number"), true));
  }