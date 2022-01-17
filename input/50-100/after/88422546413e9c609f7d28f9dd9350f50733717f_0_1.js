function resolveMultiname(obj, multiname) {
  assert(!multiname.isQName(), multiname, " already resolved");

  obj = Object(obj);
  for (var i = 0, j = multiname.namespaces.length; i < j; i++) {
    var qn = multiname.getQName(i);
    if (qn.getQualifiedName() in obj) {
      return qn;
    }
  }

  return undefined;
}