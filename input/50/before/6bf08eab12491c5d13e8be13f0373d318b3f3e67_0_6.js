function() {
    this.willReopen();
    var PrototypeMixin = this.PrototypeMixin;
    PrototypeMixin.reopen.apply(PrototypeMixin, arguments);
    return this;
  }