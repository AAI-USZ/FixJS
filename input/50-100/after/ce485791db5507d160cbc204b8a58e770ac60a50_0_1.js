function(preserveCursor) {
  if (this.paused) this.resume();
  if (this.enabled) {
    if (!preserveCursor) this.cursor = 0;
    this._refreshLine();
  } else {
    this.output.write(this._prompt);
  }
}