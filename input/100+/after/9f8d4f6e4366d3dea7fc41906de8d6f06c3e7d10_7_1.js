function foldLeft(func, val, thing) {
    if (thing instanceof Cons) {
      return thing.foldl(func, val);
    } else {
      return primFoldLeft(func, val, thing, 0);
    }
  }