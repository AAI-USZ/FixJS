function foldl(func, arg) {
      return this.tail().foldl(func, func(arg, this.head()));
    }