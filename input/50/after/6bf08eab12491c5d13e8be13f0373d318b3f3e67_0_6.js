function() {
    this.willReopen();
    reopen.apply(this.PrototypeMixin, arguments);
    return this;
  }