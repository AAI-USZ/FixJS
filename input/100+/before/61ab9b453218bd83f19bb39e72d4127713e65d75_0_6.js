function (name) {
  var signature = new JSIL.MethodSignature(null, [], []);
  var descriptor = this.ParseDescriptor({Public: true, Static: false}, name, signature);

  var mangledName = signature.GetKey(descriptor.EscapedName);

  var fn = null;

  fn = function InheritedBaseMethod_Invoke () {
    var proto = Object.getPrototypeOf(this);
    var baseMethod;

    while (true) {
      baseMethod = proto[mangledName];
      if (baseMethod === fn)
        proto = Object.getPrototypeOf(proto);
      else
        break;
    }

    if (typeof (baseMethod) === "function")
      baseMethod.apply(this, arguments);
    else
      JSIL.Host.warning("InheritBaseMethod() used but no method was found to inherit!");
  };

  JSIL.SetValueProperty(fn, "toString", 
    function InheritedBaseMethod_ToString () {
      return "<Inherited " + name + ">";
    }
  );

  JSIL.SetValueProperty(descriptor.Target, mangledName, fn);

  this.PushMember("MethodInfo", descriptor, {
    signature: signature, 
    mangledName: mangledName,
    isExternal: false
  });
}