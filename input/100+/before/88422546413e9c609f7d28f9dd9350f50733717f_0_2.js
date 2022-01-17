function setProperty(obj, multiname, value) {
  assert(obj);
  assert(multiname instanceof Multiname);

  if (typeof multiname.name === "number") {
    if (obj.indexSet) {
      obj.indexSet(multiname.name, value);
      return;
    }

    obj[multiname.name] = value;
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