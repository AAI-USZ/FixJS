function setProperty(obj, multiname, value) {
  assert(obj);
  assert(multiname instanceof Multiname);

  var numericName = parseInt(multiname.name);
  if (!isNaN(numericName)) {
    if (obj.indexSet) {
      obj.indexSet(numericName, value);
      return;
    }
    obj[numericName] = value;
    return;
  }

  if (tracePropertyAccess.value) {
    print("setProperty(" + multiname + ") trait: " + value);
  }

  var resolved = multiname.isQName() ? multiname : resolveMultiname(obj, multiname);
  if (resolved) {
    obj[resolved.getQualifiedName()] = value;
  } else {
    obj["public$" + multiname.name] = value;
  }
}