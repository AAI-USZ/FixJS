function (v) {
      if (hd.isVariable(this[v])) {
        this[v]();
      }
    }