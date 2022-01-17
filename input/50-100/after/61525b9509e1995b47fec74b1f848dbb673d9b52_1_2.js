function getClass(simpleName) {
      var c = cache[simpleName];
      if (!c) {
        c = cache[simpleName] = this.getTypeByName(Multiname.fromSimpleName(simpleName), true, true);
      }
      assert(c instanceof Class);
      return c;
    }