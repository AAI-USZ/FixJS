function getClass(simpleName) {
      var c = this.getTypeByName(Multiname.fromSimpleName(simpleName), true, true);
      assert(c instanceof Class);
      return c.instance;
    }