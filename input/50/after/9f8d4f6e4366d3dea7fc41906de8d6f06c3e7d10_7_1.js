function find(func) {
      return func(this.head()) || this.tail().find(func);
    }