function (_descriptor, methodName, signature) {
  var descriptor = this.ParseDescriptor(_descriptor, methodName, signature);

  var mangledName = signature.GetKey(descriptor.EscapedName);

  var impl = this.externals;

  var prefix = descriptor.Static ? "" : "instance$";

  var memberValue = descriptor.Target[mangledName];
  var newValue = undefined;

  var isPlaceholder;

  var fullName = this.namespace + "." + methodName;

  if (impl.hasOwnProperty(prefix + mangledName)) {
    newValue = impl[prefix + mangledName][1];

    /*
    JSIL.SetValueProperty(newValue, "toString", 
      function ExternalMethod_ToString () {
        return "<External " + signature.toString(fullName) + ">";
      }
    );
    */

    isPlaceholder = false;
  } else if (!descriptor.Target.hasOwnProperty(mangledName)) {
    var getName = (function () { return this[0].toString(this[1]); }).bind([signature, methodName]);
    newValue = JSIL.MakeExternalMemberStub(this.namespace, getName, memberValue);

    JSIL.SetValueProperty(newValue, "toString", 
      function MissingExternalMethod_ToString () {
        return "<Missing External " + signature.toString(fullName) + ">";
      }
    );

    isPlaceholder = true;
  }

  if (newValue !== undefined) {
    JSIL.SetValueProperty(descriptor.Target, mangledName, newValue);
  }

  this.PushMember("MethodInfo", descriptor, { 
    signature: signature, 
    mangledName: mangledName,
    isExternal: true,
    isPlaceholder: isPlaceholder
  });
}