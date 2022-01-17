function() {
  this._paused = false;
  // A little hacky, but does the trick of resuming the parser
  this.write(new Buffer(0));
}