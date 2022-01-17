function foldr1(func) {
      if (this.tail() === Nil) {
        return this.head();
      } else {
        return func(this.head(), this.tail().foldr1(func));
      }
    }