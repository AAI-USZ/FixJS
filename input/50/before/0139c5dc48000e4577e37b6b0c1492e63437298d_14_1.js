function nextUpstream() {
    if (this.upstream === Number.MAX_VALUE)
      this.upstream = Mark.INITIAL_UPSTREAM;
    return ++this.upstream;
  }