function deleteProperty(obj, multiname) {
  var resolved = resolveMultiname(obj, multiname, false);
  if (resolved) {
    return delete obj[resolved.getQualifiedName()];
  }
  return false;
}