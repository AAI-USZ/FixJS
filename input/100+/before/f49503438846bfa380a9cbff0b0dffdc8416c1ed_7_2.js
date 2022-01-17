function findProperty(multiname, domain, strict) {
    assert (multiname instanceof Multiname);
    if (traceScope.value || tracePropertyAccess.value) {
      print("scopeFindProperty: " + multiname);
    }
    assert (this.object);
    for (var i = 0, j = multiname.namespaces.length; i < j; i++) {
      if (multiname.getQName(i).getQualifiedName() in this.object) {
        return this.object;
      }
    }
    if (this.parent) {
      return this.parent.findProperty(multiname, domain, strict);
    }
    var obj;
    if ((obj = domain.findProperty(multiname, strict, true))) {
      return obj;
    }
    if (strict) {
      unexpected("Cannot find property " + multiname);
    }
    return this.global.object;
  }