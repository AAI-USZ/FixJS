function getProperty(obj, multiname) {
  assert(obj != undefined, "getProperty(", multiname, ") on undefined");
  assert(multiname instanceof Multiname);

  var numericName = parseInt(multiname.name);
  if (!isNaN(numericName)) {
    // Vector, for instance, has a special getter for [].
    if (obj.indexGet) {
      return obj.indexGet(numericName);
    }
    return obj[numericName];
  }

  var resolved = multiname.isQName() ? multiname : resolveMultiname(obj, multiname);
  var value = resolved ? obj[resolved.getQualifiedName()] : undefined;

  if (tracePropertyAccess.value) {
    print("getProperty(" + multiname + ") has value: " + !!value);
  }

  return value;
}