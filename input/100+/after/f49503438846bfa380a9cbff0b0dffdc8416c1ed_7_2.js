function findProperty(multiname, domain, strict) {
    assert(this.object);
    assert(multiname instanceof Multiname);

    if (traceScope.value || tracePropertyAccess.value) {
      print("Scope.findProperty(" + multiname + ")");
    }

    var obj = this.object;
    // First check trait bindings.
    if (multiname.isQName()) {
      if (multiname.getQualifiedName() in obj) {
        return obj;
      }
    } else if (resolveMultiname(obj, multiname)) {
      return obj;
    }

    if (this.parent) {
      return this.parent.findProperty(multiname, domain, strict);
    }

    // If we can't find it still, then look at the domain toplevel.
    var r;
    if ((r = domain.findProperty(multiname, strict, true))) {
      return r;
    }

    if (strict) {
      unexpected("Cannot find property " + multiname);
    }

    return this.global.object;
  }