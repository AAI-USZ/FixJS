function withStart(start) {
      return lexCons(this.head(), start, this.tail(), this.end());
    }