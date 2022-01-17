function(preserveCursor) {
  if (this.enabled) {
    if (!preserveCursor) this.cursor = 0;
    this._refreshLine();
  } else {
    this.output.write(this._prompt);
  }
}