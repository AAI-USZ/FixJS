function (ev) {
  if (ev === 'end' && this.src && this.dest && this.dest.writeHead && !this.srcEnded) {
    this.srcEnded = true;
    return false;
  }
  
  stream.Stream.prototype.emit.apply(this, arguments);
}