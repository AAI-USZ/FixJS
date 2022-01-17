function (_descriptor, methodName, signature, fn) {
  var descriptor = this.ParseDescriptor(_descriptor, methodName, signature);

  var mangledName = signature.GetKey(descriptor.EscapedName);

  if (this.typeObject.IsInterface) {
    this.typeObject.__Members__[methodName] = Function;
    this.typeObject.__Members__[mangledName] = Function;
    return;
  }

  var fullName = this.namespace + "." + methodName;
  JSIL.SetValueProperty(fn, "toString", 
    function Method_ToString () {
      return "<" + signature.toString(fullName) + ">";
    }
  );

  JSIL.SetValueProperty(descriptor.Target, mangledName, fn);

  this.PushMember("MethodInfo", descriptor, { 
    signature: signature, 
    mangledName: mangledName,
    isExternal: false
  });
}