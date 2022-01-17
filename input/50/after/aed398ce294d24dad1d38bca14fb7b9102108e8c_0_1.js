function() {
    delete xdust.templates[this.name];
    Template.prototype.dispose.call(this);
  }