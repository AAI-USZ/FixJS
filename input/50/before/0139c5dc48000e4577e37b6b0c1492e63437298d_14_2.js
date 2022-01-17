function nextDownstream() {
    if (this.downstream === -Number.MAX_VALUE)
      this.downstream = Mark.INITIAL_DOWNSTREAM;
    return --this.downstream;
  }