function map(func) {
      return cons(func(this.head()), this.tail().map(func));
    }