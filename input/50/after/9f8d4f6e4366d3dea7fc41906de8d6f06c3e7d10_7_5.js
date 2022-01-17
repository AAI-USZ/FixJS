function map(func) {
      return lexCons(func(this.head()), this.start(), this.tail().map(func), this.end());
    }