function() {
    delete xdust.cache[this.name];
    Template.prototype.dispose.call(this);
  }