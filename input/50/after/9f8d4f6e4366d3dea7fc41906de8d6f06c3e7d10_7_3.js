function foldl1(func) {
      return this.tail().foldl(func, this.head());
    }