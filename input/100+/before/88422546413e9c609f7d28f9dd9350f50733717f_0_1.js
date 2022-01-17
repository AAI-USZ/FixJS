function getProperty(obj, multiname) {
  assert(obj != undefined, "getProperty(" + multiname + ") on undefined");
  assert(multiname instanceof Multiname);

  if (typeof multiname.name === "number") {
    // Vector, for instance, has a special getter for [].
    if (obj.indexGet) {
      return obj.indexGet(multiname.name);
    }

    return obj[multiname.name];
  }

  var resolved = multiname.isQName() ? multiname : resolveMultiname(obj, multiname);
  var value = resolved ? obj[resolved.getQualifiedName()] : undefined;

  if (tracePropertyAccess.value) {
    print("getProperty(" + multiname + ") has value: " + !!value);
  }

  return value;
}