function(dest) {
  this.piped = true;
  this.dest = dest;

  filter.prototype.pipe.apply(this, arguments);
}