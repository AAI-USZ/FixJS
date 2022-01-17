function unreffedValue(deref, name, ast, top) {
      if (deref) {
        return this;
      } else {
        return this.lazy(name, ast, top);
      }
    }