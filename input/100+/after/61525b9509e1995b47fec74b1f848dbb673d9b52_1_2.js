function setProperty(obj, multiname, value) {
  assert (obj);
  if (typeof multiname.name === "number") {
    obj[SET_ACCESSOR](multiname.name, value);
    return;
  }

  var resolved;
  if (multiname.isQName()) {
    resolved = multiname;
  } else {
    resolved = resolveMultiname(obj, multiname, true);
  }

  if (!resolved) {
    // If we can't resolve the multiname, we're probably adding a dynamic
    // property, so just go ahead and use its name directly.
    // TODO: Remove assertion and loop when we're certain it will never fail.
    var publicNSIndex;
    for (var i = 0, j = multiname.namespaces.length; i < j; i++) {
      if (multiname.namespaces[i].isPublic()) {
        resolved = multiname.getQName(i);
        break;
      }
    }
    if (tracePropertyAccess.value) {
      print("setProperty: adding public: " + multiname + " value: " + value);
    }
    assert(resolved);
  }

  if (tracePropertyAccess.value) {
    // print("setProperty: resolved multiname: " + resolved + " value: " + value);
    print("setProperty: resolved multiname: " + resolved);
  }

  var name = resolved.getQualifiedName();
  var type = obj.types[name];

  if (tracePropertyAccess.value && type) {
    print("setProperty: coercing to type:" + type);
  }

  if (type && type.coerce) {
    value = type.coerce(value);
  }

  obj[name] = value;
}