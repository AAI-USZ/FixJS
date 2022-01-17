function(protoProps, classProps) {
    var parent = this;
    if (Coccyx.enforceConstructorName && !protoProps.constructorName) throw "Coccyx: Attempted to create a new class without passing in a constructor name."
    if (protoProps.constructorName && !protoProps.hasOwnProperty('constructor')) {
      eval("protoProps.constructor = function " + protoProps.constructorName + " () { parent.apply(this, arguments) };");
    }
    return originalExtend.call(parent, protoProps, classProps);
  }