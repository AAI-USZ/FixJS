function getClass(simpleName) {
      var cache = this.cache;
      var c = cache[simpleName];
      if (!c) {
        c = cache[simpleName] = this.getProperty(Multiname.fromSimpleName(simpleName), true, true);
      }
      assert(c instanceof Class);
      return c;
    }